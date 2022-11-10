import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Game {
  image: string,
  name: string,
  expiration: string,
  loading?: boolean,
  status: string,
  description: string,
  index: number,
}

export function GameContainer({ expiration, image, name, status, description, index }: Game) {
  let forNextWeek, expirationText, nameTextColor

  if (status === 'disabled') {
    expiration = 'Em Breve'
    forNextWeek = 'opacity-20',
      nameTextColor = 'text-zinc-400',
      expirationText = 'bg-zinc-700 rounded w-fit px-2 text-zinc-200'
  } else {
    expiration = `Gratuito até ${expiration}`,
      nameTextColor = 'text-white',
      expirationText = 'py-2 sm:py-0 bg-purple-700 rounded w-fit px-2 text-zinc-300'
  }

  return (
    <div className='flex flex-col relative w-[17rem] max-w-[17.053rem] keen-slider__slide'>
      <input type="checkbox" className='switch hidden' id={`switch${index}`} />
      <label className='perspective-6 cardContainer' htmlFor={`switch${index}`}>
        <div className='card preserve-3d relative hover:cursor-pointer transition-transform duration-300 ease-linear'>
          <div className="front absolute backface-hidden w-full h-full">
            <Image
              src={image}
              className={`rounded-md ${forNextWeek}`}
              width="272.848px"
              height="363.808px"
              aria-hidden="true"
            />
          </div>
          <div className='back flex flex-col w-full h-[14.6875rem] sm:h-[22.6875rem] rounded-md items-center justify-center backface-hidden rotate-y-180 bg-purple-900'>
            <p className='flex text-center text-xs sm:text-base items-center p-2 font-[Ubuntu] h-full'>
              {description}
            </p>
          </div>
        </div>
      </label>
      <div className={`w-[17rem]top-[23rem] px-2 py-2 mt-2 group-hover:scale-105 ease-in-out duration-300`}>
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