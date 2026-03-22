const STORAGE_KEY = 'scoutiq-workspace-v4';

const defaultWorkspace = {
  selectedId: null,
  query: '',
  filters: { position: 'All', age: 'all', stage: 'all', sort: 'relevance' },
  watchlist: [],
  notes: {},
  flagged: []
};

const state = {
  workspace: loadWorkspace(),
  bootstrap: null,
  results: [],
  selectedPlayer: null,
  dataset: window.SCOUTIQ_EMBEDDED || null,
  embeddedMode: Boolean(window.SCOUTIQ_EMBEDDED)
};

const els = {
  sidebarHealth: document.getElementById('sidebarHealth'),
  kpiGrid: document.getElementById('kpiGrid'),
  queryInsights: document.getElementById('queryInsights'),
  positionFilter: document.getElementById('positionFilter'),
  ageFilter: document.getElementById('ageFilter'),
  stageFilter: document.getElementById('stageFilter'),
  sortFilter: document.getElementById('sortFilter'),
  searchResults: document.getElementById('searchResults'),
  playerProfile: document.getElementById('playerProfile'),
  profileName: document.getElementById('profileName'),
  profileDecision: document.getElementById('profileDecision'),
  intelStack: document.getElementById('intelStack'),
  pipelineBoard: document.getElementById('pipelineBoard'),
  comparisonPanel: document.getElementById('comparisonPanel'),
  fitPanel: document.getElementById('fitPanel'),
  alertsPanel: document.getElementById('alertsPanel'),
  sourceTable: document.getElementById('sourceTable'),
  schemaPanel: document.getElementById('schemaPanel'),
  scoutNotesInput: document.getElementById('scoutNotesInput'),
  notesStatus: document.getElementById('notesStatus'),
  nlQuery: document.getElementById('nlQuery'),
  runQuery: document.getElementById('runQuery'),
  resetWorkspace: document.getElementById('resetWorkspace'),
  saveWatchlist: document.getElementById('saveWatchlist'),
  advancePipeline: document.getElementById('advancePipeline'),
  flagPlayer: document.getElementById('flagPlayer'),
  saveNotes: document.getElementById('saveNotes')
};

function loadWorkspace() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return structuredClone(defaultWorkspace);

  try {
    return { ...structuredClone(defaultWorkspace), ...JSON.parse(stored) };
  } catch {
    return structuredClone(defaultWorkspace);
  }
}

function persistWorkspace() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.workspace));
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

function parseQuery(query) {
  const lower = query.toLowerCase();
  return {
    wantsLeftFooted: lower.includes('left-footed') || lower.includes('left footed'),
    wantsPressing: lower.includes('press') || lower.includes('counter-press'),
    wantsProgression: lower.includes('progress') || lower.includes('carry') || lower.includes('passing'),
    wantsU23: lower.includes('u23') || lower.includes('under 23'),
    matchedTerms: query.split(/\s+/).filter(Boolean)
  };
}

function scorePlayer(player, parsedQuery) {
  if (!parsedQuery.matchedTerms.length) return player.relevance;
  const haystack = [
    player.position,
    player.team,
    player.league,
    player.summary,
    player.foot,
    ...player.strengths,
    ...player.tacticalFit,
    ...player.similar,
    ...player.schemaCoverage
  ].join(' ').toLowerCase();

  let score = player.relevance - 10;
  parsedQuery.matchedTerms.forEach((token) => {
    if (haystack.includes(token.toLowerCase())) score += 8;
  });
  if (parsedQuery.wantsLeftFooted && player.foot === 'Left') score += 10;
  if (parsedQuery.wantsPressing && player.tacticalFit.some((item) => /press/i.test(item))) score += 10;
  if (parsedQuery.wantsProgression && Object.keys(player.stats).some((key) => /progress|carry|pass/i.test(key))) score += 8;
  if (parsedQuery.wantsU23 && player.age <= 23) score += 8;
  return score;
}

function getBadgeClass(status) {
  if (/short-list/i.test(status) || /healthy/i.test(status)) return 'badge';
  if (/analyze|lagging/i.test(status)) return 'badge warning';
  return 'badge danger';
}

function enrichPlayer(player) {
  if (!player) return null;
  return {
    ...player,
    isWatchlisted: state.workspace.watchlist.includes(player.id),
    isFlagged: state.workspace.flagged.includes(player.id),
    notes: state.workspace.notes[player.id] || ''
  };
}

function searchEmbeddedPlayers() {
  const parsedQuery = parseQuery(state.workspace.query);
  return state.dataset.players
    .filter((player) => state.workspace.filters.position === 'All' || player.position === state.workspace.filters.position)
    .filter((player) => {
      if (state.workspace.filters.age === 'u21') return player.age < 21;
      if (state.workspace.filters.age === 'u24') return player.age < 24;
      if (state.workspace.filters.age === '24plus') return player.age >= 24;
      return true;
    })
    .filter((player) => state.workspace.filters.stage === 'all' || player.pipeline.toLowerCase() === state.workspace.filters.stage)
    .map((player) => ({ ...player, queryScore: scorePlayer(player, parsedQuery) }))
    .sort((a, b) => {
      if (state.workspace.filters.sort === 'fit') return b.fitScore - a.fitScore;
      if (state.workspace.filters.sort === 'upside') return b.upside - a.upside;
      if (state.workspace.filters.sort === 'risk') return a.riskScore - b.riskScore;
      return b.queryScore - a.queryScore;
    });
}

function bootstrapFromDataset() {
  return {
    overview: state.dataset.overview,
    sources: state.dataset.sources,
    schemaFields: state.dataset.schemaFields,
    externalRepositories: state.dataset.externalRepositories || [],
    positions: ['All', ...new Set(state.dataset.players.map((player) => player.position))],
    defaultSelectedId: state.dataset.players[0].id
  };
}

function renderSidebarHealth() {
  const sources = state.bootstrap.sources;
  const healthy = sources.filter((source) => source.status === 'Healthy').length;
  const needsReview = sources.length - healthy;
  els.sidebarHealth.innerHTML = `
    <p>Open-source ingestion status</p>
    <strong>${healthy}/${sources.length} sources healthy</strong>
    <span>${needsReview} sources need attention · ${state.embeddedMode ? 'standalone mode' : 'API-backed demo'}</span>
  `;
}

function renderKPIs() {
  const { overview } = state.bootstrap;
  const watchlistCount = state.workspace.watchlist.length;
  const noteCount = Object.values(state.workspace.notes).filter(Boolean).length;
  const flaggedCount = state.workspace.flagged.length;
  const kpis = [
    ['Normalized player profiles', overview.normalizedProfiles, 'Cross-source deduplicated identities'],
    ['Daily ingested updates', overview.dailyUpdates, 'Stats, news, and video metadata refreshes'],
    ['Saved scout notes', noteCount, 'Persistent local analyst annotations'],
    ['Watchlist / risk flags', `${watchlistCount} / ${flaggedCount}`, 'Tracked targets and escalations']
  ];

  els.kpiGrid.innerHTML = kpis.map(([label, value, detail]) => `
    <article class="card kpi-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${detail}</small>
    </article>
  `).join('');
}

function renderQueryInsights() {
  const parsed = parseQuery(state.workspace.query);
  const chips = [];
  if (parsed.wantsLeftFooted) chips.push('Detected: left-footed preference');
  if (parsed.wantsPressing) chips.push('Detected: pressing system fit');
  if (parsed.wantsProgression) chips.push('Detected: ball progression need');
  if (parsed.wantsU23) chips.push('Detected: U23 age target');
  if (state.bootstrap.externalRepositories?.length) chips.push(`External source loaded: ${state.bootstrap.externalRepositories[0].name}`);

  els.queryInsights.innerHTML = chips.length
    ? `<div class="query-chip-row">${chips.map((chip) => `<div class="query-chip">${chip}</div>`).join('')}</div>`
    : '<div class="query-chip">Tip: describe role, age, footedness, style, or tactical fit to improve ranking.</div>';
}

function renderResults() {
  if (!state.results.length) {
    els.searchResults.innerHTML = '<div class="empty-state">No players match the current search filters.</div>';
    return;
  }

  els.searchResults.innerHTML = state.results.map((player) => {
    const enriched = enrichPlayer(player);
    return `
      <button class="result-card ${enriched.id === state.workspace.selectedId ? 'active' : ''}" data-player-id="${enriched.id}">
        <div class="result-top">
          <div>
            <strong>${enriched.name}</strong>
            <div class="result-meta">${enriched.position} · ${enriched.team} · ${enriched.league}</div>
          </div>
          <span class="badge">Fit ${enriched.fitScore}</span>
        </div>
        <div class="mini-row">
          <span>Age ${enriched.age}</span>
          <span>${enriched.minutes} mins</span>
          <span>Relevance ${enriched.queryScore}</span>
        </div>
        <div class="result-tags">
          ${enriched.isWatchlisted ? '<span class="tag">Watchlisted</span>' : ''}
          ${enriched.isFlagged ? '<span class="tag">Risk flagged</span>' : ''}
          <span class="tag">Upside ${enriched.upside}</span>
          <span class="tag">Risk ${enriched.riskScore}</span>
          ${enriched.strengths.slice(0, 2).map((item) => `<span class="tag">${item}</span>`).join('')}
        </div>
      </button>
    `;
  }).join('');
}

function renderProfile() {
  const player = enrichPlayer(state.selectedPlayer);
  if (!player) {
    els.playerProfile.innerHTML = '<div class="empty-state">Select a player to load the unified scouting dossier.</div>';
    return;
  }

  els.profileName.textContent = player.name;
  els.profileDecision.textContent = player.pipeline;
  els.profileDecision.className = getBadgeClass(player.pipeline);
  els.scoutNotesInput.value = player.notes;

  const trendBars = player.trend.map((value, index) => `<div class="trend-box"><span>Window ${index + 1}</span><strong>${value}</strong></div>`).join('');
  const statEntries = Object.entries(player.stats).map(([label, value]) => `<div class="stat-box"><span>${label}</span><strong>${value}</strong></div>`).join('');

  els.playerProfile.innerHTML = `
    <p class="profile-copy">${player.summary}</p>
    <div class="profile-grid compact">
      <div class="stat-box"><span>Position</span><strong>${player.position}</strong></div>
      <div class="stat-box"><span>Age</span><strong>${player.age}</strong></div>
      <div class="stat-box"><span>Foot</span><strong>${player.foot}</strong></div>
      <div class="stat-box"><span>Minutes</span><strong>${player.minutes}</strong></div>
      <div class="stat-box"><span>Contract</span><strong>${player.contract}</strong></div>
      <div class="stat-box"><span>Fit score</span><strong>${player.fitScore}</strong></div>
    </div>
    <div class="profile-grid">${statEntries}</div>
    <div>
      <h3>Development trend</h3>
      <div class="profile-grid">${trendBars}</div>
    </div>
    <div class="profile-blocks">
      <div class="stat-box">
        <h3>AI-generated scouting summary</h3>
        <ul class="list-clean">
          <li><strong>Why relevant:</strong> ${player.watchlistReason}</li>
          <li><strong>Main strengths:</strong> ${player.strengths.join(', ')}</li>
          <li><strong>Main weaknesses:</strong> ${player.weaknesses.join(', ')}</li>
          <li><strong>Risk flags:</strong> ${player.risk.join(', ')}</li>
          <li><strong>Similar players:</strong> ${player.similar.join(', ')}</li>
          <li><strong>Recommendation:</strong> ${player.pipeline}</li>
        </ul>
      </div>
      <div class="stat-box">
        <h3>Scout notes + context</h3>
        <ul class="list-clean">
          <li><strong>Team:</strong> ${player.team}</li>
          <li><strong>League:</strong> ${player.league}</li>
          <li><strong>Tactical fit:</strong> ${player.tacticalFit.join(', ')}</li>
          <li><strong>Source freshness:</strong> ${player.sourceHealth.freshness}</li>
          <li><strong>Coverage:</strong> ${player.sourceHealth.coverage}%</li>
          <li><strong>Saved notes:</strong> ${player.notes || '<span class="notes-empty">No notes yet</span>'}</li>
        </ul>
      </div>
    </div>
  `;

  els.intelStack.innerHTML = `
    <div class="intel-item">
      <h3>Stats normalization layer</h3>
      <p>Canonical schema standardizes identity, minutes, positional role, and source confidence before profile generation.</p>
      <div class="tag-row">${player.schemaCoverage.map((item) => `<span class="tag">${item}</span>`).join('')}</div>
    </div>
    <div class="intel-item">
      <h3>Related news ingestion</h3>
      <ul class="list-clean">${player.news.map((item) => `<li>${item}</li>`).join('')}</ul>
    </div>
    <div class="intel-item">
      <h3>Public video aggregation</h3>
      <ul class="list-clean">${player.videos.map((item) => `<li>${item}</li>`).join('')}</ul>
    </div>
    <div class="intel-item">
      <h3>Source evidence quality</h3>
      <div class="metric-table">
        <div class="metric-row"><span class="metric-caption">Coverage</span><strong>${player.sourceHealth.coverage}%</strong></div>
        <div class="metric-row"><span class="metric-caption">Confidence</span><strong>${player.sourceHealth.confidence}%</strong></div>
        <div class="metric-row"><span class="metric-caption">Freshness</span><strong>${player.sourceHealth.freshness}</strong></div>
      </div>
    </div>
  `;

  els.fitPanel.innerHTML = [`<div class="comparison-card"><div class="fit-score-row"><strong>Current club model fit</strong><span>${player.fitScore}/100</span></div><p class="subtle">Composite of style match, age curve, role need, competition translation, and risk-adjusted upside.</p><div class="score-bar"><span style="width:${player.fitScore}%"></span></div></div>`]
    .concat(player.fitBreakdown.map((item) => `
      <div class="comparison-card">
        <div class="fit-score-row"><strong>${item.label}</strong><span>${item.score}</span></div>
        <p class="subtle">Explainable component of the scouting fit model.</p>
        <div class="score-bar"><span style="width:${item.score}%"></span></div>
      </div>
    `)).join('');

  const alerts = [
    `Trend score improved across the last 3 windows for ${player.name}.`,
    `${player.name} has ${player.news.length} fresh public context updates.`,
    `${player.name}'s source coverage is ${player.sourceHealth.coverage}%, which is ${player.sourceHealth.coverage < 80 ? 'below' : 'above'} the trust threshold.`,
    player.isFlagged ? `${player.name} has been manually flagged for extra recruitment review.` : `${player.name} has no manual risk escalation on file.`
  ];
  els.alertsPanel.innerHTML = alerts.map((alert) => `<div class="alert-item"><p>${alert}</p></div>`).join('');
}

function renderPipeline() {
  const stages = ['Monitor', 'Analyze', 'Short-list', 'Reject'];
  els.pipelineBoard.innerHTML = stages.map((stage) => {
    const matches = state.results.filter((player) => player.pipeline === stage).map(enrichPlayer);
    return `
      <div class="pipeline-stage">
        <h3>${stage}</h3>
        <ul class="list-clean">
          ${matches.length ? matches.map((player) => `<li><strong>${player.name}</strong><span class="subtle"> · ${player.watchlistReason}</span></li>`).join('') : '<li class="subtle">No players in this stage.</li>'}
        </ul>
      </div>
    `;
  }).join('');

  const selected = enrichPlayer(state.selectedPlayer);
  const comparisons = state.results.filter((player) => player.id !== selected.id).slice(0, 2).map(enrichPlayer);
  els.comparisonPanel.innerHTML = `
    <div class="comparison-card">
      <h3>Player comparison</h3>
      <p class="subtle">Contrast the selected player against stylistic alternatives for budget, age, and team-fit.</p>
      ${comparisons.map((player) => `
        <div class="fit-score-row">
          <span>${selected.name} vs ${player.name}</span>
          <span>${selected.fitScore - player.fitScore > 0 ? '+' : ''}${selected.fitScore - player.fitScore} fit delta</span>
        </div>
        <div class="fit-score-row">
          <span class="subtle">Upside ${selected.upside} vs ${player.upside}</span>
          <span class="subtle">Risk ${selected.riskScore} vs ${player.riskScore}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSources() {
  const repoCards = (state.bootstrap.externalRepositories || []).map((repo) => `
    <div class="source-card">
      <div class="source-row">
        <strong>${repo.name}</strong>
        <span class="badge">External repo</span>
      </div>
      <div class="source-row"><span class="field-meta">Stack</span><span>${repo.stack}</span></div>
      <div class="source-row"><span class="field-meta">URL</span><span>${repo.url}</span></div>
      <div class="field-meta">${repo.notes}</div>
      <div class="tag-row">${repo.endpoints.map((endpoint) => `<span class="tag">${endpoint}</span>`).join('')}</div>
    </div>
  `);

  els.sourceTable.innerHTML = state.bootstrap.sources.map((source) => `
    <div class="source-card">
      <div class="source-row">
        <strong>${source.name}</strong>
        <span class="${getBadgeClass(source.status)}">${source.status}</span>
      </div>
      <div class="source-row"><span class="field-meta">Type</span><span>${source.type}</span></div>
      <div class="source-row"><span class="field-meta">Freshness</span><span>${source.freshness}</span></div>
      <div class="source-row"><span class="field-meta">Coverage</span><span>${source.coverage}%</span></div>
      <div class="source-row"><span class="field-meta">Parser errors</span><span>${source.errors}</span></div>
    </div>
  `).concat(repoCards).join('');
}

function renderSchema() {
  els.schemaPanel.innerHTML = state.bootstrap.schemaFields.map((field) => `
    <div class="schema-field">
      <div class="field-row">
        <strong>${field.name}</strong>
        <span class="badge">${field.coverage}</span>
      </div>
      <p class="field-meta">${field.description}</p>
    </div>
  `).join('');
}

async function loadSelectedPlayer() {
  if (!state.workspace.selectedId) return;
  if (state.embeddedMode) {
    state.selectedPlayer = state.dataset.players.find((player) => player.id === state.workspace.selectedId) || null;
    return;
  }
  const data = await fetchJson(`/api/players/${state.workspace.selectedId}`);
  state.selectedPlayer = data.player;
}

async function loadResults() {
  if (state.embeddedMode) {
    state.results = searchEmbeddedPlayers();
  } else {
    const params = new URLSearchParams({
      q: state.workspace.query,
      position: state.workspace.filters.position,
      age: state.workspace.filters.age,
      stage: state.workspace.filters.stage,
      sort: state.workspace.filters.sort
    });
    const data = await fetchJson(`/api/players?${params.toString()}`);
    state.results = data.players;
  }

  if (!state.workspace.selectedId && state.results.length) state.workspace.selectedId = state.results[0].id;
  if (state.results.length && !state.results.some((player) => player.id === state.workspace.selectedId)) {
    state.workspace.selectedId = state.results[0].id;
  }
  persistWorkspace();
}

async function refreshData() {
  await loadResults();
  await loadSelectedPlayer();
  renderAll();
}

function saveNotes() {
  state.workspace.notes[state.workspace.selectedId] = els.scoutNotesInput.value.trim();
  persistWorkspace();
  els.notesStatus.textContent = state.workspace.notes[state.workspace.selectedId] ? 'Notes saved to local workspace.' : 'Notes cleared from local workspace.';
  renderKPIs();
  renderProfile();
}

function toggleWatchlist() {
  const index = state.workspace.watchlist.indexOf(state.workspace.selectedId);
  if (index === -1) state.workspace.watchlist.push(state.workspace.selectedId);
  else state.workspace.watchlist.splice(index, 1);
  persistWorkspace();
  renderAll();
}

function advancePipeline() {
  if (!state.selectedPlayer) return;
  const order = ['Monitor', 'Analyze', 'Short-list', 'Reject'];
  const nextIndex = (order.indexOf(state.selectedPlayer.pipeline) + 1) % order.length;
  state.selectedPlayer.pipeline = order[nextIndex];
  const resultMatch = state.results.find((player) => player.id === state.selectedPlayer.id);
  if (resultMatch) resultMatch.pipeline = state.selectedPlayer.pipeline;
  renderAll();
}

function toggleFlagged() {
  const index = state.workspace.flagged.indexOf(state.workspace.selectedId);
  if (index === -1) state.workspace.flagged.push(state.workspace.selectedId);
  else state.workspace.flagged.splice(index, 1);
  persistWorkspace();
  renderAll();
}

async function handleResultClick(event) {
  const card = event.target.closest('[data-player-id]');
  if (!card) return;
  state.workspace.selectedId = Number(card.dataset.playerId);
  persistWorkspace();
  await loadSelectedPlayer();
  renderAll();
}

async function boot() {
  state.bootstrap = state.embeddedMode ? bootstrapFromDataset() : await fetchJson('/api/bootstrap');
  if (!state.workspace.selectedId) state.workspace.selectedId = state.bootstrap.defaultSelectedId;

  els.positionFilter.innerHTML = state.bootstrap.positions.map((position) => `<option value="${position}">${position}</option>`).join('');
  els.positionFilter.value = state.workspace.filters.position;
  els.ageFilter.value = state.workspace.filters.age;
  els.stageFilter.value = state.workspace.filters.stage;
  els.sortFilter.value = state.workspace.filters.sort;
  els.nlQuery.value = state.workspace.query;

  bindEvents();
  await refreshData();
}

function renderAll() {
  renderSidebarHealth();
  renderKPIs();
  renderQueryInsights();
  renderResults();
  renderProfile();
  renderPipeline();
  renderSources();
  renderSchema();
}

function bindEvents() {
  els.runQuery.addEventListener('click', async () => {
    state.workspace.query = els.nlQuery.value;
    persistWorkspace();
    await refreshData();
  });
  els.positionFilter.addEventListener('change', async (event) => {
    state.workspace.filters.position = event.target.value;
    persistWorkspace();
    await refreshData();
  });
  els.ageFilter.addEventListener('change', async (event) => {
    state.workspace.filters.age = event.target.value;
    persistWorkspace();
    await refreshData();
  });
  els.stageFilter.addEventListener('change', async (event) => {
    state.workspace.filters.stage = event.target.value;
    persistWorkspace();
    await refreshData();
  });
  els.sortFilter.addEventListener('change', async (event) => {
    state.workspace.filters.sort = event.target.value;
    persistWorkspace();
    await refreshData();
  });
  els.searchResults.addEventListener('click', handleResultClick);
  els.saveNotes.addEventListener('click', saveNotes);
  els.saveWatchlist.addEventListener('click', toggleWatchlist);
  els.advancePipeline.addEventListener('click', advancePipeline);
  els.flagPlayer.addEventListener('click', toggleFlagged);
  els.resetWorkspace.addEventListener('click', async () => {
    state.workspace = structuredClone(defaultWorkspace);
    localStorage.removeItem(STORAGE_KEY);
    els.notesStatus.textContent = '';
    els.positionFilter.value = state.workspace.filters.position;
    els.ageFilter.value = state.workspace.filters.age;
    els.stageFilter.value = state.workspace.filters.stage;
    els.sortFilter.value = state.workspace.filters.sort;
    els.nlQuery.value = state.workspace.query;
    state.workspace.selectedId = state.bootstrap.defaultSelectedId;
    await refreshData();
  });
}

boot().catch((error) => {
  els.searchResults.innerHTML = `<div class="empty-state">Failed to load ScoutIQ demo data: ${error.message}</div>`;
});
