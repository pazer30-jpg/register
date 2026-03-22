# ScoutIQ scouting platform prototype

This prototype is now a more functional scouting workspace rather than a static mockup. It demonstrates:

- Natural-language player discovery with explainable query cues.
- A unified player profile with stats, source health, news, video context, AI summary, fit scoring, and scout notes.
- A persistent local workspace using `localStorage` for watchlist state, note-taking, and manual risk flags.
- Recruitment pipeline progression, player comparison, source-health admin views, and canonical schema coverage.

## File structure

- `index.html` – dashboard shell and module layout.
- `styles.css` – premium dark UI treatment for data-heavy workflows, responsive layouts, and admin panels.
- `app.js` – mock scouting dataset, query parsing, local workspace persistence, profile rendering, watchlist/pipeline actions, source-health rendering, and schema coverage views.

## Notes

The implementation is still self-contained and browser-run, but it now behaves more like a lightweight product workspace. A production version would replace local mock data and `localStorage` with:

1. Scheduled ingestion workers writing public-source data into PostgreSQL.
2. A normalized canonical player schema plus source-linked raw records.
3. A backend search API with hybrid semantic + structured retrieval.
4. Persisted watchlists, scout notes, alerts, and admin source management.
