const players = [
  {
    id: 1,
    name: 'Mateo Ibarra',
    age: 22,
    position: 'RW',
    team: 'Deportivo Azul',
    league: 'Liga Profesional',
    minutes: 2440,
    decision: 'Short-list',
    fitScore: 91,
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
    },
    summary:
      'High-upside winger whose public event data and video clips show strong acceleration, repeatable ball progression, and improving final-third decision-making. Profiles well for transition-heavy teams.',
    sources: ['FBref public tables', 'club match reports', 'league match center', 'YouTube highlights'],
    news: [
      'Reported interest from two top-flight clubs after 6 goal contributions in 8 matches.',
      'Coaching staff shifted him to inverted winger role, increasing touches in zone 14.'
    ],
    videos: ['Match highlight reel', 'Chance creation compilation', 'Pressing actions cut-up'],
    similar: ['Luis Guilherme', 'Savio', 'Ângelo'],
    tacticalFit: ['Transition attacks', 'Wide overloads', 'High press'],
    pipeline: 'Short-list',
    watchlistReason: 'Immediate fit for clubs seeking left-footed right winger with upside.'
  },
  {
    id: 2,
    name: 'Noah Bennett',
    age: 19,
    position: 'DM',
    team: 'Northbridge FC',
    league: 'EFL Championship',
    minutes: 1985,
    decision: 'Monitor',
    fitScore: 86,
    relevance: 91,
    risk: ['Limited senior sample', 'Can be pressed on first touch'],
    strengths: ['Ball-winning range', 'Vertical passing', 'Defensive scanning'],
    weaknesses: ['Half-turn press resistance', 'Long-range shooting value'],
    trend: [61, 65, 71, 73, 78, 84],
    stats: {
      tacklesWon: 3.8,
      interceptions: 2.7,
      progressivePasses: 8.9,
      duelWinRate: '58%'
    },
    summary:
      'Young holding midfielder with strong out-of-possession coverage and enough passing ambition to support a front-foot system. Worth continued tracking for role stability and growth under pressure.',
    sources: ['WhoScored public pages', 'local press coverage', 'club academy reports', 'Wyscout public clips'],
    news: [
      'Extended contract through 2029 following breakthrough season.',
      'Named in league U21 team of the month after five consecutive starts.'
    ],
    videos: ['Defensive actions compilation', 'Progressive passing vs top-6 opponents'],
    similar: ['João Neves', 'Tyler Adams', 'Stefan Bajčetić'],
    tacticalFit: ['Counter-press', 'Double pivot coverage', 'Rest-defense stability'],
    pipeline: 'Monitor',
    watchlistReason: 'Strong age-adjusted defensive output with room to improve press resistance.'
  },
  {
    id: 3,
    name: 'Luka Petrovic',
    age: 24,
    position: 'CB',
    team: 'NK Solaris',
    league: 'HNL',
    minutes: 2790,
    decision: 'Analyze',
    fitScore: 88,
    relevance: 89,
    risk: ['Recovery speed vs elite pace', 'Aggressive stepping can open channel'],
    strengths: ['Progressive distribution', 'Aerial command', 'Line-breaking carries'],
    weaknesses: ['Emergency defending in wide spaces', 'Turn speed'],
    trend: [70, 71, 73, 77, 80, 83],
    stats: {
      aerialWinRate: '67%',
      progressivePasses: 9.4,
      clearances: 5.1,
      blocks: 1.9
    },
    summary:
      'Composed central defender with passing profile suited to possession-oriented build-up. Public reports suggest leadership traits and role flexibility, but foot-race exposure remains the main recruitment caveat.',
    sources: ['Sofascore public match data', 'federation data portal', 'regional scouting blogs', 'YouTube full-match clips'],
    news: [
      'Captain in last four matches despite being one of the youngest starters.',
      'Linked with move abroad after standout display in cup semifinal.'
    ],
    videos: ['Build-up passing montage', 'Defensive duel reel'],
    similar: ['Calafiori', 'Strahinja Pavlović', 'Jakub Kiwior'],
    tacticalFit: ['High-possession back line', 'Three-at-the-back build-up', 'Set-piece threat'],
    pipeline: 'Analyze',
    watchlistReason: 'Ready-made possession CB with attractive cost-to-upside profile.'
  }
];

const state = {
  selectedId: players[0].id,
  query: '',
  filters: { position: 'All', age: 'all', stage: 'all' }
};

const els = {
  positionFilter: document.getElementById('positionFilter'),
  ageFilter: document.getElementById('ageFilter'),
  stageFilter: document.getElementById('stageFilter'),
  searchResults: document.getElementById('searchResults'),
  playerProfile: document.getElementById('playerProfile'),
  profileName: document.getElementById('profileName'),
  profileDecision: document.getElementById('profileDecision'),
  intelStack: document.getElementById('intelStack'),
  pipelineBoard: document.getElementById('pipelineBoard'),
  comparisonPanel: document.getElementById('comparisonPanel'),
  fitPanel: document.getElementById('fitPanel'),
  alertsPanel: document.getElementById('alertsPanel'),
  nlQuery: document.getElementById('nlQuery'),
  runQuery: document.getElementById('runQuery')
};

function initFilters() {
  const positions = ['All', ...new Set(players.map((player) => player.position))];
  els.positionFilter.innerHTML = positions
    .map((position) => `<option value="${position}">${position}</option>`)
    .join('');
}

function scoreQuery(player, query) {
  if (!query.trim()) return player.relevance;
  const haystack = [
    player.position,
    player.team,
    player.league,
    player.summary,
    ...player.strengths,
    ...player.tacticalFit,
    ...player.similar
  ]
    .join(' ')
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .reduce((score, token) => score + (haystack.includes(token) ? 8 : 0), player.relevance - 10);
}

function filterPlayers() {
  return [...players]
    .filter((player) => state.filters.position === 'All' || player.position === state.filters.position)
    .filter((player) => {
      if (state.filters.age === 'u21') return player.age < 21;
      if (state.filters.age === 'u24') return player.age < 24;
      if (state.filters.age === '24plus') return player.age >= 24;
      return true;
    })
    .filter((player) => state.filters.stage === 'all' || player.pipeline.toLowerCase() === state.filters.stage)
    .map((player) => ({ ...player, queryScore: scoreQuery(player, state.query) }))
    .sort((a, b) => b.queryScore - a.queryScore);
}

function renderResults() {
  const results = filterPlayers();
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
            ${player.strengths.slice(0, 3).map((item) => `<span class="tag">${item}</span>`).join('')}
          </div>
        </button>
      `
    )
    .join('');

  if (!results.length) {
    els.searchResults.innerHTML = '<div class="empty-state">No players match the current search filters.</div>';
    return;
  }

  if (!results.some((player) => player.id === state.selectedId)) {
    state.selectedId = results[0].id;
  }
}

function renderProfile() {
  const player = players.find((item) => item.id === state.selectedId);
  if (!player) return;

  els.profileName.textContent = player.name;
  els.profileDecision.textContent = player.decision;

  const trendBars = player.trend
    .map((value, index) => `<div class="trend-box"><span>Window ${index + 1}</span><strong>${value}</strong></div>`)
    .join('');

  const statEntries = Object.entries(player.stats)
    .map(([label, value]) => `<div class="stat-box"><span>${label}</span><strong>${value}</strong></div>`)
    .join('');

  els.playerProfile.innerHTML = `
    <p class="profile-copy">${player.summary}</p>
    <div class="profile-grid">
      <div class="stat-box"><span>Position</span><strong>${player.position}</strong></div>
      <div class="stat-box"><span>Age</span><strong>${player.age}</strong></div>
      <div class="stat-box"><span>Minutes</span><strong>${player.minutes}</strong></div>
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
          <li><strong>Recommendation:</strong> ${player.decision}</li>
        </ul>
      </div>
      <div class="stat-box">
        <h3>Scout notes + context</h3>
        <ul class="list-clean">
          <li><strong>Team:</strong> ${player.team}</li>
          <li><strong>League:</strong> ${player.league}</li>
          <li><strong>Tactical fit:</strong> ${player.tacticalFit.join(', ')}</li>
          <li><strong>Source coverage:</strong> ${player.sources.join(', ')}</li>
        </ul>
      </div>
    </div>
  `;

  els.intelStack.innerHTML = `
    <div class="intel-item">
      <h3>Stats normalization layer</h3>
      <p>Canonical schema standardizes competition strength, minute-adjusted outputs, positional role, and source confidence before analysis. Duplicate player identities are resolved prior to profile generation.</p>
      <div class="tag-row">${player.sources.map((source) => `<span class="tag">${source}</span>`).join('')}</div>
    </div>
    <div class="intel-item">
      <h3>Related news ingestion</h3>
      <ul class="list-clean">${player.news.map((item) => `<li>${item}</li>`).join('')}</ul>
    </div>
    <div class="intel-item">
      <h3>Public video aggregation</h3>
      <ul class="list-clean">${player.videos.map((item) => `<li>${item}</li>`).join('')}</ul>
    </div>
  `;

  els.fitPanel.innerHTML = `
    <div class="comparison-card">
      <div class="fit-score-row"><strong>Current club model fit</strong><span>${player.fitScore}/100</span></div>
      <p class="subtle">Composite of style match, age curve, role need, competition translation, and risk-adjusted upside.</p>
      <div class="score-bar"><span style="width:${player.fitScore}%"></span></div>
    </div>
    ${player.tacticalFit.map((item, index) => `
      <div class="comparison-card">
        <div class="fit-score-row"><span>${item}</span><span>${92 - index * 6}</span></div>
        <div class="score-bar"><span style="width:${92 - index * 6}%"></span></div>
      </div>`).join('')}
  `;

  els.alertsPanel.innerHTML = [
    `Form trend improved in the last 6-match window for ${player.name}.`,
    `${player.name} received a new contextual update from public news sources.`,
    `${player.name}'s fit score exceeded the short-list threshold for this recruitment model.`
  ]
    .map((alert) => `<div class="alert-item"><p>${alert}</p></div>`)
    .join('');
}

function renderPipeline() {
  const stages = ['Monitor', 'Analyze', 'Short-list'];
  els.pipelineBoard.innerHTML = stages
    .map((stage) => {
      const matches = players.filter((player) => player.pipeline === stage);
      return `
        <div class="pipeline-stage">
          <h3>${stage}</h3>
          <ul class="list-clean">
            ${matches.map((player) => `<li><strong>${player.name}</strong><span class="subtle"> · ${player.watchlistReason}</span></li>`).join('')}
          </ul>
        </div>
      `;
    })
    .join('');

  const selected = players.find((player) => player.id === state.selectedId);
  const comparisons = players.filter((player) => player.id !== state.selectedId).slice(0, 2);
  els.comparisonPanel.innerHTML = `
    <div class="comparison-card">
      <h3>Player comparison</h3>
      <p class="subtle">Contrast the selected player against stylistic alternatives for budget, age, and system fit.</p>
      ${comparisons.map((player) => `
        <div class="fit-score-row">
          <span>${selected.name} vs ${player.name}</span>
          <span>${selected.fitScore - player.fitScore > 0 ? '+' : ''}${selected.fitScore - player.fitScore} fit delta</span>
        </div>
      `).join('')}
    </div>
  `;
}

function bindEvents() {
  els.runQuery.addEventListener('click', () => {
    state.query = els.nlQuery.value;
    renderAll();
  });

  els.positionFilter.addEventListener('change', (event) => {
    state.filters.position = event.target.value;
    renderAll();
  });

  els.ageFilter.addEventListener('change', (event) => {
    state.filters.age = event.target.value;
    renderAll();
  });

  els.stageFilter.addEventListener('change', (event) => {
    state.filters.stage = event.target.value;
    renderAll();
  });

  els.searchResults.addEventListener('click', (event) => {
    const card = event.target.closest('[data-player-id]');
    if (!card) return;
    state.selectedId = Number(card.dataset.playerId);
    renderAll();
  });
}

function renderAll() {
  renderResults();
  renderProfile();
  renderPipeline();
}

initFilters();
bindEvents();
renderAll();
