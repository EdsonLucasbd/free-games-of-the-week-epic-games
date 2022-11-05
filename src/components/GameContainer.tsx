import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Game {
  image: string,
  name: string,
  expiration: string,
  link: string,
  loading?: boolean,
}

export function GameContainer({ expiration, image, link, name }: Game) {
  let forNextWeek, expirationText, nameTextColor

  if (expiration === 'Em Breve') {
    forNextWeek = 'opacity-20',
      nameTextColor = 'text-zinc-400',
      expirationText = 'bg-zinc-700 rounded w-fit px-2 text-zinc-200'
  } else {
    expiration = `Gratuito até ${expiration.slice(19)}`,
      nameTextColor = 'text-white',
      expirationText = 'py-2 sm:py-0 bg-purple-700 rounded w-fit px-2 text-zinc-300'
  }

  return (
    <div className='group flex flex-col w-[17rem] max-w-[17.053rem] keen-slider__slide'>
      <Link href={link}>
        <a
          className='group-hover:scale-105 ease-in-out duration-300'
          aria-label={`Acessar a página do jogo ${name}`}
        >
          <Image
            src={image}
            className={`rounded-md ${forNextWeek}`}
            width="272.848px"
            height="363.808px"
            aria-hidden="true"
          />
        </a>
      </Link>
      <div className={`rounded px-2 py-2 mt-2 group-hover:scale-105 ease-in-out duration-300`}>
        <p className={`text-sm sm:text-lg font-[Ubuntu] ${nameTextColor}`}>{name}</p>
        <p className={`text-xs mt-1 sm:mt-0 sm:text-sm font-[Ubuntu] ${expirationText}`}>{expiration}</p>
      </div>
    </div>
  )
}

export function LoadingTemplates() {
  const GameLoading = (
    <div className="animate-pulse flex flex-col gap-4 keen-slider__slide">
      <div className="flex-1 w-[17.053rem]">
        <div className="h-[22.7rem] bg-slate-700 rounded"></div>
      </div>
      <>
        <div className="flex-1 w-[17.053rem]">
          <div className="h-4 bg-slate-700 rounded"></div>
        </div>
        <div className="flex-1 w-[17.053rem]">
          <div className="h-4 -mt-1 bg-slate-700 rounded"></div>
        </div>
      </>
    </div>
  )

  return (
    <div className='flex flex-row gap-4'>
      {
        GameLoading
      }
      {
        GameLoading
      }
      {
        GameLoading
      }
      {
        GameLoading
      }
    </div>
  )
}