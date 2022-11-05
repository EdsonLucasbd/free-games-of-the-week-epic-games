import React from 'react'
import { Button } from './Button'

export function ErrorOnLoad() {
  return (
    <div className='h-screen'>
      <div className='mt-10 m-auto flex flex-col items-center justify-center'>
        <img className='relative w-[13.25rem] h-[13.25rem]' src="/dead.png" />
        <div className='tracking-widest items-center my-6 text-center block'>
          <span className='text-xl'>Infelizmente não foi possível carregar as informações...</span>
        </div>
        <Button onClick={() => location.reload()} className="bg-purple-600 text-slate-50 p-4 rounded hover:bg-purple-800 ease-linear duration-300">
          Atualizar a página
        </Button>
      </div>
    </div>
  )
}
