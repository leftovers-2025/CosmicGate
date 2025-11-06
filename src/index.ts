import { Elysia } from "elysia";
import { fetchVirtuePoint } from "./gemini/api";

const app = new Elysia()
    .get("/hello", () => "Hello Elysia")
    .get("/generate", async ({ status, query }) => {
        const prompt = query.prompt;
        if (prompt == null || prompt === "") {
            console.error('prompt is not set');
            return status(400, 'prompt is not set')
        }
        const point = await fetchVirtuePoint(prompt)
        console.log('respond/generate :', prompt)
        return status(200, point);
    })
    .listen(3000);

console.log(
    `CosmicGate is opened at ${app.server?.hostname}:${app.server?.port}`
);
