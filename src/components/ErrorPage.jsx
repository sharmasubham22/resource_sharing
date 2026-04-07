import React from 'react'
import { logoVector } from '../assets/Elements'

export default function ErrorPage() {
  return (
    <div className='min-h-screen bg-background'>
        <a
            href="/"
            className="flex items-center p-3 font-body"
          >
            {logoVector}
            <span className="self-center text-xl text-text-primary font-bold whitespace-nowrap">
              StackXchange
            </span>
          </a>
        <div className='flex items-center justify-center px-6 py-16'>
      <h1 className='text-3xl text-text-primary font-heading'>404 - Page Not Found</h1>
      </div>
    </div>
  )
}