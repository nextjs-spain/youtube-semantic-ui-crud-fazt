import React from 'react'
import { Navbar } from './Navbar'

export function Layout({children}) {
  return (
    <>
        <Navbar />
        {children}
    </>
  )
}
