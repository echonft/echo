'use client'
import type { Dependencies } from '@echo/ui/types/providers/dependencies'
import type { Nullable } from '@echo/utils/types/nullable'
import React, { createContext, type PropsWithChildren } from 'react'
import { create, type StoreApi } from 'zustand'

interface Props {
  dependencies: Dependencies
}

export const dependenciesContext = createContext<Nullable<StoreApi<Dependencies>>>(undefined)

export const DependenciesProvider: React.FunctionComponent<PropsWithChildren<Props>> = ({ children, dependencies }) => {
  const store = create<Dependencies>()(() => dependencies)
  return <dependenciesContext.Provider value={store}>{children}</dependenciesContext.Provider>
}
