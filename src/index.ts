import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { fetchVirtuePoint } from "./gemini/api";

const PORT = 3030;

const app = new Elysia()
    .use(cors())
    .get("/hello", () => "Hello Elysia")
    .get("/generate", async ({ set, query }) => {
        // プロンプトをクエリパラメータから取得
        const prompt = query.prompt;
        if (prompt == null || prompt === "") {
            console.error('prompt is not set');
            set.status = 400;
            return {
                message: 'prompt is not set',
            };
        }
        // 徳ポイント算出
        const output = await fetchVirtuePoint(prompt)
        console.log('respond/generate :', output)
        // 数値に変換
        const point = parseInt(output) | 0;
        // レスポンスとして返す
        set.status = 200;
        return {
            point: point,
        };
    })
    .post("/generate", async ({ set, body }) => {
        // プロンプトをJSONボディから取得
        const { text } = body;
        if (text == null || text === "") {
            console.error('prompt is not set');
            set.status = 400;
            return {
                message: 'prompt is not set',
            };
        }
        // 徳ポイント算出
        const output = await fetchVirtuePoint(text)
        console.log('respond/generate :', output)
        // 数値に変換
        const point = parseInt(output) | 0;
        // レスポンスとして返す
        set.status = 200;
        return {
            point: point,
        };
    }, {
        body: t.Object({
            text: t.String(),
        })
    })
    .listen(PORT);

console.log(
    `CosmicGate is opened at ${app.server?.hostname}:${app.server?.port}`
);
