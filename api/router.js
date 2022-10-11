import Router from "@koa/router";

export const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Hello World";
});
router.get("/users", async (ctx) => {
  ctx.body = "Users";
});
