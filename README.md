# Tax-Free Childcare Calculator

[![CI - build, test, and collect coverage](https://github.com/spfuller/tax-free-childcare-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/spfuller/tax-free-childcare-calculator/actions/workflows/ci.yml)

[![CD - GitHub Pages](https://github.com/spfuller/tax-free-childcare-calculator/actions/workflows/cd.yml/badge.svg)](https://github.com/spfuller/tax-free-childcare-calculator/actions/workflows/cd.yml)

A modern Angular app to calculate UK tax-free childcare contributions. For every £8 you pay towards childcare, the government contributes £2 (80/20 split).

## Features

- Add multiple children with individual invoice totals
- Automatic calculation of parent (80%) and government (20%) contributions
- Running totals for both parent and government contributions
- Input validation ensures non-negative numbers only
- Responsive design with Bootstrap v5
- Built with Angular standalone components and signals

## Technical Stack

- Angular 20.3.x (standalone components, signals, new control flow)
- Vitest for unit tests (via Angular experimental unit-test builder)
- Bootstrap v5 for styling
- pnpm for package management
- UUID for stable IDs

## Prerequisites

- Node.js >= 24.11.0 (see package.json "engines")
- pnpm >= 10.23.0 (packageManager configured in package.json)
- PowerShell (pwsh) recommended for Windows examples (optional)

Note: package.json includes a preinstall script to enforce pnpm (only-allow pnpm).

## Installation

1. Clone the repository:

```powershell
git clone https://github.com/spfuller/tax-free-childcare-calculator.git
cd tax-free-childcare-calculator
```

2. Install dependencies:

```powershell
pnpm install
```

## pnpm scripts

The project uses pnpm. The important scripts available (as defined in package.json):

- start: ng serve
- build: ng build
- build:dev: ng build --configuration development
- build:github: ng build --base-href=/tax-free-childcare-calculator/
- watch: ng build --watch --configuration development
- test:watch: ng test --watch
- test:coverage: ng test --no-watch --code-coverage
- format: prettier --write .
- format:check: prettier --check .
- lint: ng lint

Use them with pnpm, for example:

```powershell
pnpm start           # start dev server (ng serve)
pnpm run build       # production build
pnpm run build:dev   # development build
pnpm run test:watch  # run tests in watch mode
pnpm run test:coverage # run tests and generate coverage
pnpm run format      # run prettier
pnpm run lint        # run linter
```

## Development

Start the dev server:

```powershell
pnpm start
```

Open http://localhost:4200. The app will reload on changes.

Build for production:

```powershell
pnpm run build
```

Build artifacts are written to `dist/`.

## Key Files

- `src/main.ts` — bootstraps the app (`bootstrapApplication`).
- `src/app/app.component.ts` — root component.
- `src/app/app.config.ts` — application providers and config.
- `src/app/calculator/calculator.component.ts` — main calculator UI and state (signals, computed values).
- `src/app/calculator/calculator.component.html` — calculator template using new control flow.
- `src/app/calculator/_services/calculator.service.ts` — pure calculation logic and rounding.
- `src/app/child-entry/child-entry.component.ts` — per-child entry component.
- `src/app/child-entry-calculation/child-entry-calculation.component.ts` — contribution display for a single child.
- `src/app/summary/summary.component.ts` — totals and summary UI.
- Tests (examples):
  - `src/app/calculator/_services/calculator.service.spec.ts`
  - `src/app/calculator/calculator.component.spec.ts`
  - `src/app/child-entry/child-entry.component.spec.ts`
  - `src/app/child-entry-calculation/child-entry-calculation.component.spec.ts`
  - `src/app/summary/summary.component.spec.ts`
- `package.json` / `pnpm-lock.yaml` — scripts and dependencies.

## CI/CD and Coverage

- GitHub Actions runs tests on push and pull requests.
- Coverage reports are generated and uploaded as artifacts (see Actions tab).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
