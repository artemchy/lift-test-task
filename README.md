# Lift Quiz App

A small React quiz app built with Vite and TypeScript.

The app asks a few yes/no questions, detects the user country when possible, lets the user upload an image, and saves quiz progress in `localStorage` so answers are not lost after page refresh.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Query
- SCSS Modules
- Vitest + React Testing Library

## Features

- Typed quiz steps and safe step navigation
- Country detection with fallback text
- Saved quiz history in `localStorage`
- Image upload with type and size validation
- Accessible buttons, loader, progress bar, and focus states
- Error boundary around the app
- Production bundle split into vendor chunks

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL from the terminal.

## Scripts

```bash
npm run dev       # start dev server
npm run build     # type-check and build
npm run preview   # preview production build
npm run lint      # run ESLint
npm run test      # run tests
```

## Tests

Current tests cover:

- placeholder replacement
- quiz step restore from `localStorage`
- saving quiz answers
- upload file validation

Run them with:

```bash
npm run test
```
