# ScoutIQ scouting platform prototype

This prototype demonstrates a premium, modular scouting intelligence dashboard built around the brief:

- Natural-language player search and filtered discovery.
- Unified player profiles that combine normalized stats, contextual news, public video links, AI summaries, risk indicators, and fit scores.
- Watchlist + recruitment pipeline stages for monitor, analyze, and short-list decisions.
- Team-fit scoring, comparison workflows, and alert surfaces.
- A technical architecture section describing ingestion jobs, PostgreSQL-backed storage, deduplication, and admin tooling.

## File structure

- `index.html` – dashboard shell and module layout.
- `styles.css` – premium dark UI treatment for data-heavy workflows.
- `app.js` – mock public-source ingestion results, search/filter logic, profile rendering, AI summary presentation, pipeline views, and fit/alert modules.

## Notes

The implementation is intentionally self-contained so it can be opened directly in a browser without additional tooling. In a production system, the mock data and in-browser logic would be replaced by:

1. Scheduled ingestion workers writing into PostgreSQL.
2. A normalized player schema with source confidence and deduplication metadata.
3. A search service with hybrid semantic + structured retrieval.
4. Admin tools for source health, parser management, and sync monitoring.
