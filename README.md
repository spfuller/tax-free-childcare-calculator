# Tax-Free Childcare Calculator

[![CI](https://github.com/spfuller/tax-free-childcare-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/spfuller/tax-free-childcare-calculator/actions/workflows/ci.yml)
[![Coverage Artifacts](https://github.com/spfuller/tax-free-childcare-calculator/actions/workflows/ci.yml/badge.svg?branch=master&label=coverage)](https://github.com/spfuller/tax-free-childcare-calculator/actions/workflows/ci.yml)

A modern Angular app to calculate UK tax-free childcare contributions. For every £8 you pay towards childcare, the government contributes £2 (80/20 split).

## Features

- Add multiple children with individual invoice totals
- Automatic calculation of your contribution (80%) and government contribution (20%)
- Running totals for both your total and the government's total contribution
- Input validation ensures positive numbers only
- Responsive design with Bootstrap v5

## Technical Stack

- Angular 20.3.x with standalone components
- Modern Angular patterns (signals, computed values, new control flow)
- Bootstrap v5 for styling
- Vitest for testing via Angular experimental unit-test builder

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- PowerShell Core (pwsh) for Windows users

### Installation

1. Clone the repository:

```powershell
git clone https://github.com/spfuller/tax-free-childcare-calculator.git
cd tax-free-childcare-calculator
```

2. Install dependencies:

```powershell
npm install
```

### Development Commands

Start the development server:

```powershell
npm start
```

Then open your browser to http://localhost:4200. The app will automatically reload when you make changes.

### Testing Commands

Run tests in watch mode (development):

```powershell
npm run test:watch
```

Run tests once (CI mode):

```powershell
npm run test:ci
```

Generate coverage report:

```powershell
npm run test:coverage
```

### Key Files

- `src/app/calculator/calc.ts` — Pure calculation functions for the 80/20 split
- `src/app/calculator/calculator.ts` — Main calculator component using signals
- `src/app/calculator/calculator.html` — Template with Bootstrap styling
- `src/app/calculator/calc.spec.ts` — Unit tests for calculation logic

### CI/CD and Coverage

The project uses GitHub Actions for continuous integration:

- Automated tests run on every push and pull request
- Coverage reports are generated and uploaded as artifacts
- Coverage artifacts are available from the Actions tab (click badges above)

## License

MIT

## Additional Commands

Build for production:

```powershell
npm run build
```

The build artifacts will be stored in the `dist/` directory.

For more information on the Angular CLI and its capabilities, visit the [Angular CLI documentation](https://angular.dev/tools/cli).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
