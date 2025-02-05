"use client"
import React, { useState } from 'react'
import {searchContext} from "./conntext"

function ContextProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

 const  [search , setSearch] = useState("")


  return (
          <>
          <searchContext.Provider    value={{search , setSearch}}>
         {children}
          </searchContext.Provider>
            
          </>
  )
}

export default ContextProvider