import { Container, getRandom } from "@cloudflare/containers";
import { Hono } from "hono";

export class MyContainer extends Container {
  defaultPort = 8080;

  onError(error: unknown) {
    console.error(error);
  }

  onStart() {
    console.log("Container started");
  }

  onStop() {
    console.log("Container stopped");
  }
}

const app = new Hono<{
  Bindings: { MY_CONTAINER: DurableObjectNamespace<MyContainer> };
}>();

// Load balance all requests across multiple containers
app.get("*", async (c) => {
  const container = await getRandom(c.env.MY_CONTAINER, 3);
  return await container.fetch(c.req.raw);
});

export default app;
