# @myra/shared

Shared TypeScript types, contracts, and domain helpers for the Myra Agents
ecosystem. Consumed as a git submodule (`packages/shared`) by:

- **[Myra-Agents](https://github.com/Myra-Agents/Myra-Agents)** — the desktop + web app (public)
- **Myra-Agents-Server** — the agent runner / sidecar (private)
- **Myra-Agents-Hub** — the centralized cloud hub (private)

## Contents

- `src/types/` — `kanban`, `schedule`, `settings` data models (mirror the Rust structs)
- `src/contract.ts`, `src/hub-contract.ts` — client⇄backend API contracts and route tables
- `src/domain/` — pure domain helpers (`cards`, `schedules`, `settings`, `agent`, `command`, `ids`)
- `src/store.ts`, `src/dispatch.ts` — shared store + dispatch utilities

No secrets, no runtime side effects — types and pure functions only.

## Use

This package is not published to npm; it is wired in as a git submodule and
resolved through the consuming repo's package manager workspace
(`workspaces: ["packages/*"]`). After cloning a consumer:

```bash
git submodule update --init
```

## License

MIT — see [LICENSE](./LICENSE).
