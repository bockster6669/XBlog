import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-[1100px] mx-auto justify-center">{children}</main>;
}
