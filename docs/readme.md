This is the directory for deployment on GitHub pages. 

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
cd site/
npx run build
cp -r out/ ../docs/
```