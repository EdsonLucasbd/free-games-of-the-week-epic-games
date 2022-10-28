import type { NextPage } from 'next'
import { Button } from '../src/components/Button'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GameContainer, LoadingTemplates } from '../src/components/GameContainer'
import { ErrorOnLoad } from '../src/components/Error'

interface Game {
  image: string,
  name: string,
  expiration: string,
  link: string
}

const Home: NextPage = () => {
  const [games, setGames] = useState<Game[]>()
  const [isLoading, setIsLoading] = useState(true)
  const unrealArray = new Array(4)

  useEffect(() => {
    console.log('🔎 Buscando...')
    fetch('/api/searchGames')
      .then(res => res.json())
      .then((data) => {
        setGames(data)
        setIsLoading(false)
        console.log('resultado: ', data)
      })
      .catch((err) => {
        setGames(undefined)
        setIsLoading(false)
        console.error(err)
      })
  }, [])

  return (
    <>
      <Head>
        <title>Free Game Search</title>
      </Head>
      <main className='flex flex-col items-center justify-center gap-16'>
        <h1 className='flex flex-col py-4 gap-1 items-center justify-center'>
          <p className='text-xl' aria-hidden>🤖</p>
          <p className='text-3xl'>Qual jogo está gratuito hoje?</p>
        </h1>
        <div className='flex flex-row gap-4'>
          {isLoading
            ? <LoadingTemplates />
            : (
              games !== undefined
                ? (
                  games!.map((game, index) => {
                    return <GameContainer
                      key={index}
                      expiration={game.expiration}
                      image={game.image}
                      link={game.link}
                      name={game.name}
                    />
                  })
                )
                : (
                  <ErrorOnLoad />
                )
            )
          }
        </div>
      </main>
    </>
  )
}

export default Home
