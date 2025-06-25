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

## Running locally

To run locally, navigate to `/site` and run: 

```bash
npm run dev
```

and it'll start up at `http://localhost:3000`.