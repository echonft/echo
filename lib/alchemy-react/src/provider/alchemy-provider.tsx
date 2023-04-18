import { alchemyApiKey } from '@echo/alchemy'
import { isMainnet } from '@echo/utils'
import { Alchemy, Network } from 'alchemy-sdk'
import { createContext, FunctionComponent, ReactNode, useContext, useMemo } from 'react'

export interface AlchemyContext {
  alchemy: Alchemy
}

const alchemyContext = createContext<AlchemyContext | null>(null)

interface Props {
  children?: ReactNode | undefined
}

export const AlchemyProvider: FunctionComponent<Props> = ({ children }) => {
  const alchemy = useMemo(
    () =>
      new Alchemy({
        apiKey: alchemyApiKey(),
        network: isMainnet ? Network.ETH_MAINNET : Network.ETH_GOERLI
      }),
    []
  )

  return <alchemyContext.Provider value={{ alchemy }}>{children}</alchemyContext.Provider>
}

export const useAlchemy = (): AlchemyContext => {
  const contextValue = useContext(alchemyContext)
  if (!contextValue) {
    throw new Error('useAlchemy must be used within AlchemyProvider')
  }
  return contextValue
}
