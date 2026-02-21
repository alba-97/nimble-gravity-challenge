# Nimble Gravity Coding Challenge

Small React app that connects to an API to:

- Fetch candidate data by email.
- Fetch the list of open positions.
- Apply to a position by submitting a GitHub repository URL.

The API base URL is configured via `BASE_URL: import.meta.env.VITE_BASE_URL`.

## Dependencies

- React
- Vite
- TypeScript
- Axios

## Requirements

- Node.js (LTS recommended)
- npm

## Configuration

Create a `.env` file at the project root:

```bash
VITE_BASE_URL=https://your-base-url
```

The value must be the base domain where the API is hosted.

## Install

```bash
npm install
```

## Run in development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Preview build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Using the UI

- In the **Candidate** panel:
  - Enter your email.
  - Click **Load** to fetch your `uuid` and `candidateId`.
- Click **Load jobs** to fetch the list of open positions.
- In **Open positions**:
  - For the position you want to apply to, enter your repository URL.
  - Click **Submit** to send your application.

The UI handles loading and error states for both data fetching and per-position submissions.