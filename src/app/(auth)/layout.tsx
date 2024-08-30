import React from 'react'

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <main className='h-full flex justify-center'>{children}</main>
  )
}
