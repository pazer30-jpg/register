# ScoutIQ scouting platform demo

ScoutIQ now supports two ways to run:

## Option 1: API-backed demo

- `index.html` + `app.js` + `server.js`
- Uses the lightweight Node API and seeded mock data
- Best for showing the full local product slice

Run:

```bash
npm run scoutiq:serve
```

Then open `http://127.0.0.1:4321`.

## Option 2: standalone browser file

If localhost or port forwarding is inconvenient, open this file directly in a browser:

```text
showcase/scouting-platform/standalone.html
```

This mode embeds the seed data directly in the page so the UI works without starting the Node server.

## What it includes

- Natural-language query hints and ranked search results.
- Unified player profiles with stats, source health, news, video context, AI summary, and fit scoring.
- Local analyst workspace persistence for watchlists, notes, and manual risk flags.
- Admin-facing source-health and canonical schema coverage panels.
- An imported external source reference for `romanzeze/footballManeger`, surfaced from the provided repository and its documented player/team endpoints.
- A starter PostgreSQL schema for moving the demo toward production.

## File structure

- `index.html` – API-backed dashboard shell.
- `standalone.html` – standalone version that works without the Node server.
- `styles.css` – premium dark dashboard styling.
- `app.js` – browser client that works in API-backed mode or embedded-data mode.
- `server.js` – lightweight Node HTTP server that serves static assets and JSON API endpoints.
- `data/seed.json` – mock canonical scouting data used by the local API and standalone mode.
- `db/schema.sql` – starter PostgreSQL schema for normalized players, source records, metrics, notes, and watchlists.

## Production next steps

1. Replace `data/seed.json` with scheduled ingestion jobs writing into PostgreSQL.
2. Replace the in-browser local workspace with authenticated backend persistence.
3. Replace rule-based query hinting with hybrid semantic search and grounded AI summaries.
4. Extend the server into a real application API with alerts, assignments, and source management workflows.


## AppDeploy

If you want to publish this through AppDeploy, use `npm start` as the runtime command and point AppDeploy at `showcase/scouting-platform`. The repo also includes `APPDEPLOY.md` with a ready-to-paste deployment prompt.
