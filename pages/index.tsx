import type { NextPage } from 'next'
import { Button } from '../src/components/Button'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [games, setGames] = useState(null)

  useEffect(() => {
    fetch('/api/searchGames')
      .then(res => res.json())
      .then(data => setGames(data))
  }, [])

  console.log(games)
  return (
    <>
      <Head>
        <title>Free Game Search</title>
      </Head>
      <main className='flex flex-col items-center justify-center'>
        <h1 className='flex flex-col py-4 gap-1 items-center justify-center'>
          <p className='text-xl' aria-hidden>🤖</p>
          <p className='text-3xl'>Qual jogo está gratuito hoje?</p>
        </h1>
        <Button
          className='flex flex-row items-center mt-16 justify-center gap-1 w-40 h-12 text-lg rounded-md bg-violet-700 hover:bg-violet-500 duration-200 ease-linear'
        // onClick={searchBot}
        >
          <MagnifyingGlassIcon className='w-5 h-5' />
          Pesquisar
        </Button>
      </main>
    </>
  )
}

export default Home
