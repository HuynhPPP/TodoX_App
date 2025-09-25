import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-slate-50'>
      <img src="404_NotFound.png" alt="404 Not Found" className='max-w-full mb-6 w-96' />
      <h1 className='text-4xl font-bold'>Page not found ❌</h1>
      <a src="/" className='inline-block px-6 py-3 mt-6 font-medium text-white transition-colors shadow-md bg-primary rounded-2xl hover:bg-primary-dark'>Go to home</a>
    </div>
  )
}

export default NotFound