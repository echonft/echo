import { config } from '@lib/config/config'
import { getAlchemyChain } from '@lib/services/alchemy/utils/chain'
import { Alchemy } from 'alchemy-sdk'
import React, { PropsWithChildren, useMemo } from 'react'

const alchemyContext = React.createContext<Alchemy | null>(null)

export const AlchemyProvider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const alchemy = useMemo(() => {
    const settings = {
      apiKey: config().alchemyKey,
      network: getAlchemyChain()
    }

    return new Alchemy(settings)
  }, [])
  return <alchemyContext.Provider value={alchemy}>{children}</alchemyContext.Provider>
}

export const useAlchemy = (): Alchemy => {
  const contextValue = React.useContext(alchemyContext)
  if (!contextValue) {
    throw new Error('useAlchemy must be used within ApiProvider.')
  }
  return contextValue
}
