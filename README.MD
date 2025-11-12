# mcp-playground

Short description
This repository contains an MCP (Model Context Protocol) server implementation packaged as the npm package `@m.huda/mcp-playground`. The server exposes a small set of tools over the MCP server API and runs over stdio when started.

## Key files
- `src/mcp-server.ts` — MCP server definition and registered tools.
- `src/index.ts` — Entrypoint wiring the server to a stdio transport.
- `build/index.js` — Compiled output used by the published package and the local run entry.
- `package.json` — Project metadata, scripts, and the package `bin` declaration.

## What this project implements
- Tools registered by the server (examples):
  - `GET_DEVICE_LIST` — fetches a device list from a public API.
  - `ADD_NEW_DEVICE` — accepts a device payload (validated with `zod`) and posts it to the public API.

These are implemented in `src/mcp-server.ts` and exposed through the MCP server instance created there.

## How to run locally (development)
1. Install dependencies:

```powershell
npm install
```

2. Run with fast reload (development):

```powershell
npm run dev
```

3. Build and run the compiled output:

```powershell
npm run build
npm run start
# or
node build/index.js
```

## How to run the published / "cloud" server

This package is published as `@m.huda/mcp-playground`. The published package exposes a `bin` which runs the compiled `build/index.js`. You can run the cloud/published server through `npx`:

```powershell
npx @m.huda/mcp-playground
```

To publish a new release (example flow):

```powershell
npm run build
npm run publish-minor
```

## MCP servers config (used by tooling)
This JSON snippet is included here so tooling or other projects can easily reference the cloud and local server entries used during development and testing.

```json
{
  "mcpServers": {
    "mcp-playground": {
      "command": "npx",
      "args": [
        "@m.huda/mcp-playground"
      ]
    },
    "mcp-playground-local": {
      "command": "node",
      "args": [
        "D:\\GITHUB\\mcp-playground\\build\\index.js"
      ]
    }
  },
  "preferences": {
    "menuBarEnabled": true
  }
}
```

## Notes
- The cloud entry (`mcp-playground`) runs the published npm package via `npx` and is useful for quickly testing the published server without building locally.
- The local entry (`mcp-playground-local`) runs the compiled `build/index.js` directly from your working tree and is convenient for debugging local changes.
---