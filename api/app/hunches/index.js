import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (ctx) => {
  if (!ctx.request.body.homeTeamScore && !ctx.request.body.awayTeamScore) {
    ctx.status = 400;
    return;
  }

  const userId = "cl9t5b85w0000jecg42875mzs";
  const {gameId} = ctx.request.body;
  const homeTeamScore = Number(ctx.request.body.homeTeamScore);
  const awayTeamScore = Number(ctx.request.body.awayTeamScore);

  try {
    const hunch = await prisma.hunch.upsert({
      where: {
        userId_gameId: {
          userId,
          gameId,
        },
      },
      create: {userId, gameId, homeTeamScore, awayTeamScore},
      update: {homeTeamScore, awayTeamScore},
    });
    ctx.body = hunch;
  } catch (error) {
    console.error(error);
    ctx.body = error;
    ctx.status = 500;
  }
};

export const list = async (ctx) => {
  try {
    const hunches = await prisma.hunch.findMany();
    ctx.body = hunches;
  } catch (error) {
    console.error(error);
    ctx.body = error;
    ctx.status = 500;
  }
};
