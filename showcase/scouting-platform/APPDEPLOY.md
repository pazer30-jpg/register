# Deploying ScoutIQ with AppDeploy

AppDeploy is chat-native, so the actual deployment must be triggered from a chat that has the AppDeploy connector installed.

## Recommended AppDeploy prompt

```text
@AppDeploy deploy this ScoutIQ sports scouting web app.

Requirements:
- Node.js app
- Start command: npm start
- App root: showcase/scouting-platform
- Public landing page should be the scouting dashboard
- Keep both routes working:
  - /
  - /standalone.html
- Preserve the local JSON API for player search/profile/bootstrap endpoints
- Preserve localStorage workspace features for notes, watchlist, and risk flags
- Use the included seed data as the initial demo dataset
```

## Important runtime details

- Primary entrypoint: `showcase/scouting-platform/server.js`
- Start command: `npm start`
- Default port behavior: uses `process.env.PORT` and falls back to `4321`
- Standalone fallback file: `showcase/scouting-platform/standalone.html`

## Why this repo is AppDeploy-ready

- The app already exposes a simple Node HTTP server.
- The server already respects `PORT`.
- The client has no build step or framework compilation requirement.
- The app can run in both API-backed and embedded-data modes.
