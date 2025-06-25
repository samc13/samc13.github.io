To deploy this site to GitHub pages, you need to add static HTML & CSS files to `/docs/out/`.

GitHub pages is configured to look at the `/docs` directory on the main branch and look for an `/out` directory. 

To deploy: 

* Update the `next.config.ts` file to output static files:

```ts
const nextConfig: NextConfig = {
  /* config options here */
  output: 'export'
};
```

* This will deploy static files to the `/out` directory
* Move this directory to the `/docs` directory
* Push this up to remote

```bash
cd site/ &&
npx next build &&
cp -r out/ ../docs/out/ &&
cp out/index.html ../docs/index.html &&
cd ../ &&
git add -f docs/out/ &&
git push
```