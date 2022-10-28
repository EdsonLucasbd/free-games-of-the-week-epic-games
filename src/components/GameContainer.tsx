import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Game {
  image: string,
  name: string,
  expiration: string,
  link: string,
  loading?: boolean
}

export function GameContainer({ expiration, image, link, name }: Game) {
  let forNextWeek, nextExpiration
  if (expiration === 'Em Breve') {
    forNextWeek = 'opacity-20'
    nextExpiration = `A partir de ${expiration}`
  }

  return (
    <div className='flex flex-col w-[17rem] max-w-[17.053rem]'>
      <Link href={link}>
        <a className='hover:scale-105 ease-in-out duration-300'>
          <Image src={image} className={`rounded-md ${forNextWeek}`} width="272.848px" height="363.808px" />
        </a>
      </Link>
      <p className='my-4'>{name}</p>
      <p className='text-sm'>{expiration}</p>
    </div>
  )
}

export function LoadingTemplates() {
  const GameLoading = (
    <div className="animate-pulse flex flex-col gap-4">
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