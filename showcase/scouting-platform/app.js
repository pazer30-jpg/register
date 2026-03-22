const STORAGE_KEY = 'scoutiq-workspace-v2';

const basePlayers = [
  {
    id: 1,
    name: 'Mateo Ibarra',
    age: 22,
    foot: 'Left',
    position: 'RW',
    team: 'Deportivo Azul',
    league: 'Liga Profesional',
    minutes: 2440,
    contract: '2027',
    decision: 'Short-list',
    pipeline: 'Short-list',
    fitScore: 91,
    upside: 93,
    riskScore: 38,
    relevance: 96,
    risk: ['Physical duel adaptation', 'Small-sample finishing spike'],
    strengths: ['Explosive 1v1 isolation', 'Progressive carries', 'Back-post movement'],
    weaknesses: ['Aerial contribution', 'Defensive timing in mid-block'],
    trend: [68, 72, 74, 80, 82, 88],
    stats: {
      goals: 11,
      assists: 9,
      progressiveCarries: 7.8,
      xgChain: 0.62,
      takeOnsWon: '63%'
    },
    summary:
      'High-upside winger whose public event data and video clips show strong acceleration, repeatable ball progression, and improving final-third decision-making. Profiles well for transition-heavy teams.',
    sources: ['FBref public tables', 'club match reports', 'league match center', 'YouTube highlights'],
    sourceHealth: { coverage: 92, confidence: 89, freshness: '4h ago' },
    news: [
      'Reported interest from two top-flight clubs after 6 goal contributions in 8 matches.',
      'Coaching staff shifted him to inverted winger role, increasing touches in zone 14.'
    ],
    videos: ['Match highlight reel', 'Chance creation compilation', 'Pressing actions cut-up'],
    similar: ['Luis Guilherme', 'Savio', 'Ângelo'],
    tacticalFit: ['Transition attacks', 'Wide overloads', 'High press'],
    fitBreakdown: [
      { label: 'Role fit', score: 95 },
      { label: 'Tactical fit', score: 92 },
      { label: 'Production', score: 88 },
      { label: 'Risk adjustment', score: 73 }
    ],
    watchlistReason: 'Immediate fit for clubs seeking left-footed right winger with upside.',
    schemaCoverage: ['identity', 'minutes', 'event stats', 'news context', 'video links', 'fit score']
  },
  {
    id: 2,
    name: 'Noah Bennett',
    age: 19,
    foot: 'Right',
    position: 'DM',
    team: 'Northbridge FC',
    league: 'EFL Championship',
    minutes: 1985,
    contract: '2029',
    decision: 'Monitor',
    pipeline: 'Monitor',
    fitScore: 86,
    upside: 95,
    riskScore: 44,
    relevance: 91,
    risk: ['Limited senior sample', 'Can be pressed on first touch'],
    strengths: ['Ball-winning range', 'Vertical passing', 'Defensive scanning'],
    weaknesses: ['Half-turn press resistance', 'Long-range shooting value'],
    trend: [61, 65, 71, 73, 78, 84],
    stats: {
      tacklesWon: 3.8,
      interceptions: 2.7,
      progressivePasses: 8.9,
      duelWinRate: '58%',
      recoveries: 8.4
    },
    summary:
      'Young holding midfielder with strong out-of-possession coverage and enough passing ambition to support a front-foot system. Worth continued tracking for role stability and growth under pressure.',
    sources: ['WhoScored public pages', 'local press coverage', 'club academy reports', 'Wyscout public clips'],
    sourceHealth: { coverage: 88, confidence: 84, freshness: '2h ago' },
    news: [
      'Extended contract through 2029 following breakthrough season.',
      'Named in league U21 team of the month after five consecutive starts.'
    ],
    videos: ['Defensive actions compilation', 'Progressive passing vs top-6 opponents'],
    similar: ['João Neves', 'Tyler Adams', 'Stefan Bajčetić'],
    tacticalFit: ['Counter-press', 'Double pivot coverage', 'Rest-defense stability'],
    fitBreakdown: [
      { label: 'Role fit', score: 90 },
      { label: 'Tactical fit', score: 86 },
      { label: 'Production', score: 81 },
      { label: 'Risk adjustment', score: 70 }
    ],
    watchlistReason: 'Strong age-adjusted defensive output with room to improve press resistance.',
    schemaCoverage: ['identity', 'minutes', 'event stats', 'academy context', 'news context']
  },
  {
    id: 3,
    name: 'Luka Petrovic',
    age: 24,
    foot: 'Left',
    position: 'CB',
    team: 'NK Solaris',
    league: 'HNL',
    minutes: 2790,
    contract: '2026',
    decision: 'Analyze',
    pipeline: 'Analyze',
    fitScore: 88,
    upside: 84,
    riskScore: 47,
    relevance: 89,
    risk: ['Recovery speed vs elite pace', 'Aggressive stepping can open channel'],
    strengths: ['Progressive distribution', 'Aerial command', 'Line-breaking carries'],
    weaknesses: ['Emergency defending in wide spaces', 'Turn speed'],
    trend: [70, 71, 73, 77, 80, 83],
    stats: {
      aerialWinRate: '67%',
      progressivePasses: 9.4,
      clearances: 5.1,
      blocks: 1.9,
      carriesIntoMidfield: 4.6
    },
    summary:
      'Composed central defender with passing profile suited to possession-oriented build-up. Public reports suggest leadership traits and role flexibility, but foot-race exposure remains the main recruitment caveat.',
    sources: ['Sofascore public match data', 'federation data portal', 'regional scouting blogs', 'YouTube full-match clips'],
    sourceHealth: { coverage: 85, confidence: 82, freshness: '6h ago' },
    news: [
      'Captain in last four matches despite being one of the youngest starters.',
      'Linked with move abroad after standout display in cup semifinal.'
    ],
    videos: ['Build-up passing montage', 'Defensive duel reel'],
    similar: ['Calafiori', 'Strahinja Pavlović', 'Jakub Kiwior'],
    tacticalFit: ['High-possession back line', 'Three-at-the-back build-up', 'Set-piece threat'],
    fitBreakdown: [
      { label: 'Role fit', score: 89 },
      { label: 'Tactical fit', score: 91 },
      { label: 'Production', score: 83 },
      { label: 'Risk adjustment', score: 65 }
    ],
    watchlistReason: 'Ready-made possession CB with attractive cost-to-upside profile.',
    schemaCoverage: ['identity', 'minutes', 'event stats', 'leadership context', 'video links']
  },
  {
    id: 4,
    name: 'Rayan Osei',
    age: 20,
    foot: 'Right',
    position: 'AM',
    team: 'Union Harbor',
    league: 'Belgian Pro League',
    minutes: 2210,
    contract: '2028',
    decision: 'Monitor',
    pipeline: 'Monitor',
    fitScore: 84,
    upside: 92,
    riskScore: 41,
    relevance: 87,
    risk: ['Decision speed vs settled low blocks', 'Needs more defensive work-rate consistency'],
    strengths: ['Final-third passing', 'Half-space receives', 'Carries through traffic'],
    weaknesses: ['Weak-side tracking', 'Box arrival timing'],
    trend: [59, 64, 70, 75, 81, 86],
    stats: {
      keyPasses: 2.9,
      shotCreatingActions: 5.3,
      carriesIntoBox: 2.1,
      xA: 0.31,
      touchesZone14: 9.2
    },
    summary:
      'Creative attacking midfielder with strong progression and chance creation signals. Profiles as a development buy for clubs seeking a press-resistant connector between midfield and front line.',
    sources: ['FBref public tables', 'Belgian federation reports', 'public analyst thread', 'YouTube clips'],
    sourceHealth: { coverage: 81, confidence: 80, freshness: '1h ago' },
    news: [
      'Assisted in three straight league matches after moving into a free-8 role.',
      'Praised by head coach for leadership in transition moments.'
    ],
    videos: ['Creative passing compilation', 'Turn-and-drive actions'],
    similar: ['Xavi Simons', 'Arda Güler', 'Rayan Cherki'],
    tacticalFit: ['Positional play', 'Half-space creation', 'Counter-press support'],
    fitBreakdown: [
      { label: 'Role fit', score: 84 },
      { label: 'Tactical fit', score: 88 },
      { label: 'Production', score: 80 },
      { label: 'Risk adjustment', score: 68 }
    ],
    watchlistReason: 'High-upside creative profile with visible growth in role responsibility.',
    schemaCoverage: ['identity', 'minutes', 'event stats', 'coach context', 'video links']
  }
];

const sources = [
  { name: 'FBref public tables', type: 'Stats', status: 'Healthy', freshness: '2h', coverage: 94, errors: 0 },
  { name: 'League match center', type: 'Context', status: 'Healthy', freshness: '4h', coverage: 88, errors: 1 },
  { name: 'Club news pages', type: 'News', status: 'Lagging', freshness: '11h', coverage: 73, errors: 3 },
  { name: 'YouTube highlights', type: 'Video', status: 'Healthy', freshness: '1h', coverage: 79, errors: 0 },
  { name: 'Federation data portal', type: 'Stats', status: 'Needs review', freshness: '26h', coverage: 68, errors: 5 }
];

const schemaFields = [
  { name: 'identity.full_name', description: 'Canonical merged player identity', coverage: '100%' },
  { name: 'identity.aliases', description: 'Source-specific names and spellings', coverage: '82%' },
  { name: 'demographics.birth_year', description: 'Age normalization and age-band filters', coverage: '100%' },
  { name: 'club.current_team', description: 'Latest normalized team record', coverage: '100%' },
  { name: 'role.primary_position', description: 'Current primary role classification', coverage: '100%' },
  { name: 'stats.minutes_played', description: 'Current season playing time', coverage: '100%' },
  { name: 'stats.normalized_metrics', description: 'Per-90, possession-adjusted, or percentile metrics', coverage: '76%' },
  { name: 'context.news_items', description: 'Public reporting and context snippets', coverage: '88%' },
  { name: 'context.video_links', description: 'Public highlight or full-match links', coverage: '79%' },
  { name: 'ai.summary', description: 'Grounded scouting summary and recommendation', coverage: '71%' }
];

const defaultWorkspace = {
  selectedId: 1,
  query: '',
  filters: { position: 'All', age: 'all', stage: 'all', sort: 'relevance' },
  watchlist: [1, 3],
  notes: {
    1: 'Elite acceleration profile. Need more live viewings vs top-defending fullbacks before target designation.'
  },
  flagged: []
};

function loadWorkspace() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored ? { ...defaultWorkspace, ...stored } : structuredClone(defaultWorkspace);
  } catch {
    return structuredClone(defaultWorkspace);
  }
}

const state = loadWorkspace();

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

function persistWorkspace() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getSelectedPlayer() {
  return basePlayers.find((player) => player.id === state.selectedId) || basePlayers[0];
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

function scoreQuery(player, parsedQuery) {
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
  ]
    .join(' ')
    .toLowerCase();

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

function getPlayersWithWorkspace() {
  return basePlayers.map((player) => ({
    ...player,
    isWatchlisted: state.watchlist.includes(player.id),
    notes: state.notes[player.id] || '',
    isFlagged: state.flagged.includes(player.id)
  }));
}

function filterPlayers() {
  const parsedQuery = parseQuery(state.query);
  return getPlayersWithWorkspace()
    .filter((player) => state.filters.position === 'All' || player.position === state.filters.position)
    .filter((player) => {
      if (state.filters.age === 'u21') return player.age < 21;
      if (state.filters.age === 'u24') return player.age < 24;
      if (state.filters.age === '24plus') return player.age >= 24;
      return true;
    })
    .filter((player) => state.filters.stage === 'all' || player.pipeline.toLowerCase() === state.filters.stage)
    .map((player) => ({ ...player, queryScore: scoreQuery(player, parsedQuery) }))
    .sort((a, b) => {
      if (state.filters.sort === 'fit') return b.fitScore - a.fitScore;
      if (state.filters.sort === 'upside') return b.upside - a.upside;
      if (state.filters.sort === 'risk') return a.riskScore - b.riskScore;
      return b.queryScore - a.queryScore;
    });
}

function initFilters() {
  const positions = ['All', ...new Set(basePlayers.map((player) => player.position))];
  els.positionFilter.innerHTML = positions.map((position) => `<option value="${position}">${position}</option>`).join('');
  els.positionFilter.value = state.filters.position;
  els.ageFilter.value = state.filters.age;
  els.stageFilter.value = state.filters.stage;
  els.sortFilter.value = state.filters.sort;
  els.nlQuery.value = state.query;
}

function renderSidebarHealth() {
  const healthy = sources.filter((source) => source.status === 'Healthy').length;
  const needsReview = sources.filter((source) => source.status !== 'Healthy').length;
  els.sidebarHealth.innerHTML = `
    <p>Open-source ingestion status</p>
    <strong>${healthy}/${sources.length} sources healthy</strong>
    <span>${needsReview} sources need attention · Next sync in 32 minutes</span>
  `;
}

function renderKPIs() {
  const watchlistCount = state.watchlist.length;
  const flaggedCount = state.flagged.length;
  const noteCount = Object.values(state.notes).filter(Boolean).length;
  const kpis = [
    ['Normalized player profiles', '284,000+', 'Cross-source deduplicated identities'],
    ['Tracked watchlist players', watchlistCount, 'Live workspace selections'],
    ['Saved scout notes', noteCount, 'Persistent internal annotations'],
    ['Flagged risk cases', flaggedCount, 'Profiles requiring extra review']
  ];

  els.kpiGrid.innerHTML = kpis
    .map(
      ([label, value, detail]) => `
        <article class="card kpi-card">
          <span>${label}</span>
          <strong>${value}</strong>
          <small>${detail}</small>
        </article>
      `
    )
    .join('');
}

function renderQueryInsights() {
  const parsed = parseQuery(state.query);
  const chips = [];
  if (parsed.wantsLeftFooted) chips.push('Detected: left-footed preference');
  if (parsed.wantsPressing) chips.push('Detected: pressing system fit');
  if (parsed.wantsProgression) chips.push('Detected: ball progression need');
  if (parsed.wantsU23) chips.push('Detected: U23 age target');

  els.queryInsights.innerHTML = chips.length
    ? `<div class="query-chip-row">${chips.map((chip) => `<div class="query-chip">${chip}</div>`).join('')}</div>`
    : '<div class="query-chip">Tip: describe role, age, footedness, style, or tactical fit to improve ranking.</div>';
}

function getBadgeClass(status) {
  if (/short-list/i.test(status) || /healthy/i.test(status)) return 'badge';
  if (/analyze|lagging/i.test(status)) return 'badge warning';
  return 'badge danger';
}

function renderResults() {
  const results = filterPlayers();
  if (!results.length) {
    els.searchResults.innerHTML = '<div class="empty-state">No players match the current search filters.</div>';
    return;
  }

  if (!results.some((player) => player.id === state.selectedId)) {
    state.selectedId = results[0].id;
  }

  els.searchResults.innerHTML = results
    .map(
      (player) => `
        <button class="result-card ${player.id === state.selectedId ? 'active' : ''}" data-player-id="${player.id}">
          <div class="result-top">
            <div>
              <strong>${player.name}</strong>
              <div class="result-meta">${player.position} · ${player.team} · ${player.league}</div>
            </div>
            <span class="badge">Fit ${player.fitScore}</span>
          </div>
          <div class="mini-row">
            <span>Age ${player.age}</span>
            <span>${player.minutes} mins</span>
            <span>Relevance ${player.queryScore}</span>
          </div>
          <div class="result-tags">
            ${player.isWatchlisted ? '<span class="tag">Watchlisted</span>' : ''}
            ${player.isFlagged ? '<span class="tag">Risk flagged</span>' : ''}
            <span class="tag">Upside ${player.upside}</span>
            <span class="tag">Risk ${player.riskScore}</span>
            ${player.strengths.slice(0, 2).map((item) => `<span class="tag">${item}</span>`).join('')}
          </div>
        </button>
      `
    )
    .join('');
}

function renderProfile() {
  const player = getPlayersWithWorkspace().find((item) => item.id === state.selectedId);
  if (!player) return;

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

  els.fitPanel.innerHTML = player.fitBreakdown
    .map(
      (item, index) => `
        <div class="comparison-card">
          <div class="fit-score-row"><strong>${index === 0 ? 'Current club model fit' : item.label}</strong><span>${index === 0 ? `${player.fitScore}/100` : item.score}</span></div>
          <p class="subtle">${index === 0 ? 'Composite of style match, age curve, role need, competition translation, and risk-adjusted upside.' : 'Explainable component of the scouting fit model.'}</p>
          <div class="score-bar"><span style="width:${index === 0 ? player.fitScore : item.score}%"></span></div>
        </div>
      `
    )
    .join('');

  const alerts = [
    `Trend score improved across the last 3 windows for ${player.name}.`,
    `${player.name} has ${player.news.length} fresh public context updates.`,
    `${player.name}'s source coverage is ${player.sourceHealth.coverage}%, which is ${player.sourceHealth.coverage < 80 ? 'below' : 'above'} the trust threshold.`,
    player.isFlagged ? `${player.name} has been manually flagged for extra recruitment review.` : `${player.name} has no manual risk escalation on file.`
  ];

  els.alertsPanel.innerHTML = alerts.map((alert) => `<div class="alert-item"><p>${alert}</p></div>`).join('');
}

function renderPipeline() {
  const players = getPlayersWithWorkspace();
  const stages = ['Monitor', 'Analyze', 'Short-list', 'Reject'];
  els.pipelineBoard.innerHTML = stages
    .map((stage) => {
      const matches = players.filter((player) => player.pipeline === stage);
      return `
        <div class="pipeline-stage">
          <h3>${stage}</h3>
          <ul class="list-clean">
            ${matches.length ? matches.map((player) => `<li><strong>${player.name}</strong><span class="subtle"> · ${player.watchlistReason}</span></li>`).join('') : '<li class="subtle">No players in this stage.</li>'}
          </ul>
        </div>
      `;
    })
    .join('');

  const selected = players.find((player) => player.id === state.selectedId);
  const comparisons = players.filter((player) => player.id !== state.selectedId).sort((a, b) => Math.abs(selected.fitScore - b.fitScore) - Math.abs(selected.fitScore - a.fitScore)).slice(0, 2);
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
  els.sourceTable.innerHTML = sources
    .map(
      (source) => `
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
      `
    )
    .join('');
}

function renderSchema() {
  els.schemaPanel.innerHTML = schemaFields
    .map(
      (field) => `
        <div class="schema-field">
          <div class="field-row">
            <strong>${field.name}</strong>
            <span class="badge">${field.coverage}</span>
          </div>
          <p class="field-meta">${field.description}</p>
        </div>
      `
    )
    .join('');
}

function saveNotes() {
  const note = els.scoutNotesInput.value.trim();
  state.notes[state.selectedId] = note;
  persistWorkspace();
  els.notesStatus.textContent = note ? 'Notes saved to local workspace.' : 'Notes cleared from local workspace.';
  renderKPIs();
  renderProfile();
}

function toggleWatchlist() {
  const index = state.watchlist.indexOf(state.selectedId);
  if (index === -1) state.watchlist.push(state.selectedId);
  else state.watchlist.splice(index, 1);
  persistWorkspace();
  renderAll();
}

function advancePipeline() {
  const player = basePlayers.find((item) => item.id === state.selectedId);
  const order = ['Monitor', 'Analyze', 'Short-list', 'Reject'];
  const nextIndex = (order.indexOf(player.pipeline) + 1) % order.length;
  player.pipeline = order[nextIndex];
  player.decision = player.pipeline;
  persistWorkspace();
  renderAll();
}

function toggleFlagged() {
  const index = state.flagged.indexOf(state.selectedId);
  if (index === -1) state.flagged.push(state.selectedId);
  else state.flagged.splice(index, 1);
  persistWorkspace();
  renderAll();
}

function resetWorkspace() {
  Object.assign(state, structuredClone(defaultWorkspace));
  basePlayers.forEach((player) => {
    const original = defaultWorkspace.selectedId === player.id ? player.pipeline : player.pipeline;
    if (player.id === 1) player.pipeline = 'Short-list';
    if (player.id === 2) player.pipeline = 'Monitor';
    if (player.id === 3) player.pipeline = 'Analyze';
    if (player.id === 4) player.pipeline = 'Monitor';
  });
  persistWorkspace();
  initFilters();
  renderAll();
}

function bindEvents() {
  els.runQuery.addEventListener('click', () => {
    state.query = els.nlQuery.value;
    persistWorkspace();
    renderAll();
  });

  els.positionFilter.addEventListener('change', (event) => {
    state.filters.position = event.target.value;
    persistWorkspace();
    renderAll();
  });

  els.ageFilter.addEventListener('change', (event) => {
    state.filters.age = event.target.value;
    persistWorkspace();
    renderAll();
  });

  els.stageFilter.addEventListener('change', (event) => {
    state.filters.stage = event.target.value;
    persistWorkspace();
    renderAll();
  });

  els.sortFilter.addEventListener('change', (event) => {
    state.filters.sort = event.target.value;
    persistWorkspace();
    renderAll();
  });

  els.searchResults.addEventListener('click', (event) => {
    const card = event.target.closest('[data-player-id]');
    if (!card) return;
    state.selectedId = Number(card.dataset.playerId);
    persistWorkspace();
    renderAll();
  });

  els.saveNotes.addEventListener('click', saveNotes);
  els.saveWatchlist.addEventListener('click', toggleWatchlist);
  els.advancePipeline.addEventListener('click', advancePipeline);
  els.flagPlayer.addEventListener('click', toggleFlagged);
  els.resetWorkspace.addEventListener('click', resetWorkspace);
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

initFilters();
bindEvents();
renderAll();
