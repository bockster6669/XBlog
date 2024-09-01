import React from 'react'

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <main className='flex justify-center w-full mt-4'>{children}</main>
  )
}
