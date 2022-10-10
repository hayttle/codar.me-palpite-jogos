import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Hello World";
});
router.get("/users", async (ctx) => {
  ctx.body = "Users";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
