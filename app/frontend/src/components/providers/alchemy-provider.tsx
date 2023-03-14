import { chainId } from '@echo/utils'
import { config } from '@lib/config/config'
import { Alchemy, Network } from 'alchemy-sdk'
import { createContext, FunctionComponent, PropsWithChildren, useContext, useMemo } from 'react'

const alchemyContext = createContext<Alchemy | null>(null)

export const AlchemyProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const alchemy = useMemo(() => {
    // FIXME create a mapper for chain id => Network
    const settings = {
      apiKey: config.alchemyKey,
      network: chainId() === 1 ? Network.ETH_MAINNET : Network.ETH_GOERLI
    }

    return new Alchemy(settings)
  }, [])
  return <alchemyContext.Provider value={alchemy}>{children}</alchemyContext.Provider>
}

export const useAlchemy = (): Alchemy => {
  const contextValue = useContext(alchemyContext)
  if (!contextValue) {
    throw new Error('useAlchemy must be used within ApiProvider.')
  }
  return contextValue
}
