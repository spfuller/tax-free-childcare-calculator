# Tax-Free Childcare Calculator

Simple Angular app to calculate the UK-style "tax-free childcare" 80/20 split per child invoice. For every £8 you pay, the government pays £2.

This repository was scaffolded with the Angular CLI and uses modern Angular patterns (standalone components, signals, and the new template control-flow). Bootstrap (v5) is included for quick styling.

CI status

You can add a workflow status badge to this README. Replace `<OWNER>` and `<REPO>` with your GitHub organization/user and repository name:

```markdown
![CI](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)
```

Coverage artifact

The CI workflow uploads the coverage folder as an artifact when changes are pushed to `main`/`master`. You can download it from the workflow run page under `Artifacts`.

Quick commands (PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Run the dev server (open http://localhost:4200)

```powershell
npm start
```

3. Run tests (watch mode)

```powershell
npm run test:watch
```

4. Run tests once (CI-friendly)

```powershell
npm run test:ci
```

5. Run tests and produce coverage

```powershell
npm run test:coverage
```

Notes on testing

- This project uses the Angular experimental unit-test builder with Vitest as the runner. Tests are executed through the Angular CLI (`ng test`) so the CLI can generate the correct Vitest configuration for Angular internals.
- Test setup initializes the Angular TestBed environment (see `src/test-setup.ts`).

Files of interest

- `src/app/calculator/calc.ts` — pure calculation helpers for the 80/20 split.
- `src/app/calculator/calculator.ts` — standalone `CalculatorComponent` (signals + computed).
- `src/app/calculator/calculator.html` — component template (uses control-flow and Bootstrap classes).
- `src/app/calculator/calc.spec.ts` and `src/app/calculator/calculator.spec.ts` — Vitest unit and DOM tests.

CI guidance

- Use `npm run test:ci` in CI to run tests once without watch mode. The `test:coverage` script runs tests and emits coverage reports (configured by the Angular CLI builder).

If you'd like I can add a GitHub Actions workflow that runs `npm ci` and `npm run test:ci` on push/PR — tell me and I'll create it.

License
MIT

# TaxFreeChildcareCalculator

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
