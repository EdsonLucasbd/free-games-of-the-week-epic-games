import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useKeenSlider } from "keen-slider/react"
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

  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2,
      spacing: 10,
    },
    breakpoints: {
      '(min-width: 500px)': {
        loop: false,
      },
      '(min-width: 768px)': {
        disabled: true
      }
    }
  })

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
    <div className='flex flex-col h-full'>
      <Head>
        <title>Free Game Search</title>
      </Head>
      <main className='flex flex-col flex-1 items-center justify-center gap-16'>
        <h1 className='flex flex-col mt-6 gap-1 items-center justify-center'>
          <img src="/epic_logo.svg" aria-hidden='true' />
          <p className='text-3xl'>Veja os jogos gratuitos da semana</p>
        </h1>
        <div className='flex flex-row gap-4 keen-slider px-6 sm:px-0' ref={ref}>
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
      <footer className='group flex flex-row items-center justify-center absolute w-full py-4 bottom-0 border-t-2 border-zinc-800'>
        <p className='font-[Ubuntu] text-zinc-300'>
          Feito com 💜
          por <a aria-label='ir para o meu perfil no github' className='group-hover:text-purple-400 ease-linear duration-300' href="https://github.com/EdsonLucasbd">Lucas</a>
        </p>
      </footer>
    </div>
  )
}

export default Home
