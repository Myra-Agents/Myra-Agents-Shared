# @myra/shared — Claude Code Instructions

Shared TypeScript types, API contracts, and pure domain helpers for the Myra
Agents ecosystem. **No runtime, no secrets, no side effects** — types and pure
functions only. Consumed as the `packages/shared` git submodule by **app** and
**hub**, and mirrored (by hand) by the Rust **server**.

Part of the [Myra-Agents](https://github.com/orgs/Myra-Agents/repositories) org:
app (public, desktop) · **shared (public, this)** · hub (private, SaaS) ·
server (private, Rust sidecar) · plugins (public).

## What this is / is not

- **Is:** the single source of truth for the data models + the client⇄backend
  command contract. Pure, dependency-free, not published to npm.
- **Is not:** a buildable package. There is no build step and no test project —
  consumers import the `.ts` directly via the workspace + the `exports` map in
  `package.json`. Don't add bundling, a `dist/`, or runtime deps.

## Layout (`src/`)

- `types/` — `kanban.ts`, `schedule.ts`, `settings.ts`: the data models. These
  **mirror the Rust structs** in the server (`models.rs`) and the app's
  `src-tauri` — camelCase field names must match byte-for-byte.
- `contract.ts` — the client⇄backend command contract + route table.
- `hub-contract.ts` — the desktop⇄hub API contract.
- `domain/` — pure helpers: `cards`, `schedules`, `settings`, `agent`,
  `command`, `ids`. No I/O, no `Date.now()` non-determinism leaking into outputs
  where it can be passed in.
- `store.ts`, `dispatch.ts` — shared store + dispatch utilities.
- `index.ts` — the public barrel (the `.` export).

## Conventions

- **Changing a model is a cross-repo change.** A field added here must be added
  to: the Rust struct in `server/src/models.rs`, the app's `src/types/` + every
  Rust struct literal, and the hub if it touches the hub contract. camelCase via
  `#[serde(rename_all = "camelCase")]` on the Rust side.
- Keep everything tree-shakeable and side-effect-free; the `exports` map is the
  API surface — update it when you add a new entry point.
- After editing, consumers pick it up by bumping their submodule pointer
  (`git submodule update --remote packages/shared`), not via npm.

## Verify

```bash
npx tsc --noEmit      # the only gate — types must compile standalone
```

Edit notes that apply across repos belong in the app's `CLAUDE.md`; this file
covers the shared package only.
