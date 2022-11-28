import jwt from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

export const create = async (ctx) => {
  if (!ctx.headers.authorization) {
    ctx.status = 401
    return
  }
  
  const [, token] = ctx.request.headers.authorization.split(" ")
  
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    
    // if (!ctx.request.body.homeTeamScore && !ctx.request.body.awayTeamScore) {
    //   ctx.status = 400
    //   return
    // }

    const userId = data.id
    const {gameId} = ctx.request.body
    const homeTeamScore = Number(ctx.request.body.homeTeamScore)
    const awayTeamScore = Number(ctx.request.body.awayTeamScore)

    try {
      const hunch = await prisma.hunch.upsert({
        where: {
          userId_gameId: {
            userId,
            gameId
          }
        },
        create: {userId, gameId, homeTeamScore, awayTeamScore},
        update: {homeTeamScore, awayTeamScore}
      })
      ctx.body = hunch
    } catch (error) {
      console.error(error)
      ctx.body = error
      ctx.status = 500
    }
  } catch (error) {
    ctx.status = 401
    return
  }
}


