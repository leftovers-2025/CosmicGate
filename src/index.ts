import { Elysia } from "elysia";

const app = new Elysia()
    .get("/hello", () => "Hello Elysia")
    .listen(3000);

console.log(
    `CosmicGate is opened at ${app.server?.hostname}:${app.server?.port}`
);
