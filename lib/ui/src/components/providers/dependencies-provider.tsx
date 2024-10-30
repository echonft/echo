'use client'
import { type Dependencies, dependenciesStore } from '@echo/ui/stores/dependencies-store'
import type { Nullable } from '@echo/utils/types/nullable'
import React, { createContext, type PropsWithChildren } from 'react'
import type { StoreApi } from 'zustand'

interface Props {
  dependencies: Dependencies
}

export const dependenciesContext = createContext<Nullable<StoreApi<Dependencies>>>(undefined)

export const DependenciesProvider: React.FunctionComponent<PropsWithChildren<Props>> = ({ children, dependencies }) => {
  const store = dependenciesStore(dependencies)
  return <dependenciesContext.Provider value={store}>{children}</dependenciesContext.Provider>
}
