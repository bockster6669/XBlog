import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-[1100px] mx-auto flex justify-center">{children}</main>;
}
