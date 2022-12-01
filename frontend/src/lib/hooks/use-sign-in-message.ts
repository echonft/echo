import { isNil } from 'rambda'
import { useMemo } from 'react'
import { SiweMessage } from 'siwe'
import { useAccount, useNetwork } from 'wagmi'

// TODO Use Result
export const useSignInMessage = (nonce: string | undefined): string | undefined => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  return useMemo(() => {
    if (isNil(nonce) || isNil(address) || isNil(chain)) {
      return undefined
    }
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum to the app.',
      uri: window.location.origin,
      version: '1',
      chainId: chain.id,
      nonce
    })
    return message.prepareMessage()
  }, [nonce, address, chain])
}
