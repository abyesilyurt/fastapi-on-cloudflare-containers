# Deploying a FastAPI app on Cloudflare Containers

## Deploying to Cloudflare

First, run:

```bash
npm install
```

Then, run:

```bash
npm run deploy
```

This will deploy the worker and the container to Cloudflare if you are on a paid plan.

## Notes
- `js/src/index.ts` is the entry point for the worker. You can modify it to add your own routing logic.
Currently, it will load balance requests across 3 containers.
- The main app is in the `app/` directory.