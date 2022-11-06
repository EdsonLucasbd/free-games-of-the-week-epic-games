import { getGames } from 'epic-free-games/dist'
import type { NextApiRequest, NextApiResponse } from 'next'
import { requestGames } from './lib/requestGames'


export default async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const games = await requestGames()

    res.setHeader('Content-Type', 'application/json')
    // res.setHeader('Cache-Control', 'public, imutable, no-transform, s-maxage=3600, max-age=3600')

    return res.end(JSON.stringify(games))
  } catch (error) {
    console.error(error)

    return res.status(500).send('Internal server error')
  }
}
