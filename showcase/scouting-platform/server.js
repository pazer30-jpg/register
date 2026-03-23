const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const ROOT = __dirname;
const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'seed.json'), 'utf8'));

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath);
  const contentType = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.sql': 'text/plain; charset=utf-8'
  }[ext] || 'text/plain; charset=utf-8';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

function parseQueryHints(query) {
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

function searchPlayers(params) {
  const query = params.q || '';
  const parsedQuery = parseQueryHints(query);
  const position = params.position || 'All';
  const age = params.age || 'all';
  const stage = params.stage || 'all';
  const sort = params.sort || 'relevance';

  return seed.players
    .filter((player) => position === 'All' || player.position === position)
    .filter((player) => {
      if (age === 'u21') return player.age < 21;
      if (age === 'u24') return player.age < 24;
      if (age === '24plus') return player.age >= 24;
      return true;
    })
    .filter((player) => stage === 'all' || player.pipeline.toLowerCase() === stage)
    .map((player) => ({
      ...player,
      queryScore: scorePlayer(player, parsedQuery)
    }))
    .sort((a, b) => {
      if (sort === 'fit') return b.fitScore - a.fitScore;
      if (sort === 'upside') return b.upside - a.upside;
      if (sort === 'risk') return a.riskScore - b.riskScore;
      return b.queryScore - a.queryScore;
    });
}

function router(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname || '/';

  if (pathname === '/api/bootstrap') {
    sendJson(res, 200, {
      overview: seed.overview,
      sources: seed.sources,
      schemaFields: seed.schemaFields,
      externalRepositories: seed.externalRepositories || [],
      positions: ['All', ...new Set(seed.players.map((player) => player.position))],
      defaultSelectedId: seed.players[0].id
    });
    return;
  }

  if (pathname === '/api/players') {
    sendJson(res, 200, { players: searchPlayers(parsedUrl.query) });
    return;
  }

  if (pathname.startsWith('/api/players/')) {
    const id = Number(pathname.split('/').pop());
    const player = seed.players.find((item) => item.id === id);
    if (!player) {
      sendJson(res, 404, { error: 'Player not found' });
      return;
    }
    sendJson(res, 200, { player });
    return;
  }

  if (pathname === '/api/admin/sources') {
    sendJson(res, 200, { sources: seed.sources });
    return;
  }

  if (pathname === '/api/admin/schema') {
    sendJson(res, 200, { schemaFields: seed.schemaFields, externalRepositories: seed.externalRepositories || [] });
    return;
  }

  const filePath = pathname === '/' ? path.join(ROOT, 'index.html') : path.join(ROOT, pathname.replace(/^\//, ''));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }
  sendFile(res, filePath);
}

const port = Number(process.env.PORT || 4321);
http.createServer(router).listen(port, () => {
  console.log(`ScoutIQ demo server running at http://127.0.0.1:${port}`);
});
