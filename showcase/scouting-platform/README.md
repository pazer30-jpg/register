# ScoutIQ scouting platform demo

ScoutIQ is now a small end-to-end demo instead of a purely static showcase.

## What it includes

- API-backed player search and profile loading from a local Node server.
- Natural-language query hints and ranked search results.
- Unified player profiles with stats, source health, news, video context, AI summary, and fit scoring.
- Local analyst workspace persistence for watchlists, notes, and manual risk flags.
- Admin-facing source-health and canonical schema coverage panels.
- A starter PostgreSQL schema for moving the demo toward production.

## File structure

- `index.html` – dashboard shell and product modules.
- `styles.css` – premium dark dashboard styling.
- `app.js` – browser client that fetches API data and manages local workspace state.
- `server.js` – lightweight Node HTTP server that serves static assets and JSON API endpoints.
- `data/seed.json` – mock canonical scouting data used by the local API.
- `db/schema.sql` – starter PostgreSQL schema for normalized players, source records, metrics, notes, and watchlists.

## Run locally

```bash
npm run scoutiq:serve
```

Then open `http://127.0.0.1:4321`.

## Production next steps

1. Replace `data/seed.json` with scheduled ingestion jobs writing into PostgreSQL.
2. Replace the in-browser local workspace with authenticated backend persistence.
3. Replace rule-based query hinting with hybrid semantic search and grounded AI summaries.
4. Extend the server into a real application API with alerts, assignments, and source management workflows.
