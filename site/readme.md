## About

This is a static website created using Next.js:

```bash
npx create-next-app@latest {project_name} -ts
```

It uses a bunch of default features:

* TypeScript
* React
* ESLint
* Tailwind CSS
* Turbopack (Vercel's - the creators of Next.js - shiney improvement on Webpack. It should lend faster compile/refresh times in exchange for still being in early development)

By including a `.nojekyll` (empty) file at the source root, GitHub pages will not use Jekyll, which is the default behaviour. 

## Building

To build it and find all the ESLint errors that you've introduced, you can run: 

```bash
npm run build
```

## Running locally

To run locally, navigate to `/site` and run: 

```bash
npm run dev
```

and it'll start up at `http://localhost:3000`.

## Libraries used

I've tried to exercise care in only adding libraries when it makes absolutely no sense to try to get by without it

* `react-markdown` for rendering markdown in blog posts
* `react-select` a nice quick means of getting excellent dropdown menu support
* `recharts` lovely react native charts for graphing park runs and strava data
* `@remixicon/react` a well maintained set of icons that nicely integrate as react components

`react-select` was perhaps a little lazy, but that probably fits into the category of "why reinvent the wheel?". I wouldn't be proving much to anyone, least of all myself. 