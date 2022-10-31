import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const create = async (ctx) => {
  const password = await bcrypt.hash(ctx.request.body.password, 10);
  const data = {
    name: ctx.request.body.name,
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    password,
  };

  try {
    const {password, ...user} = await prisma.user.create({
      data,
    });
    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    console.error(error);
    ctx.body = error;
    ctx.status = 500;
  }
};

export const login = async (ctx) => {
  const [, token] = ctx.headers.authorization.split(" ");
  const [username, password] = atob(token).split(":");
  console.log({username, password});
  try {
    const userAuthenticated = await prisma.user.findUnique({
      where: {
        username_password: {
          username,
          password: await bcrypt.hash(password, 10),
        },
      },
    });
    ctx.body = userAuthenticated;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 401;
    ctx.body = error;
  }
};
