import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const create = async (ctx) => {
  const password = await bcrypt.hash(ctx.request.body.password, 10);
  const data = {
    name: ctx.request.body.name,
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    password,
  };

  try {
    const { password, ...user } = await prisma.user.create({
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
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const hash = user.password;
    const userAuthenticated = await bcrypt.compare(password, hash);
    if (userAuthenticated) {
      ctx.body = "Usuário autenticado";
    } else {
      ctx.status = 401;
      ctx.body = "Senha inválida!";
    }
  } catch (error) {
    ctx.status = 401;
    ctx.body = "Nome de usuário inválido!";
  }
};
