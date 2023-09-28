'use client'
import { getNonceFetcher } from '@echo/api/helpers/get-nonce-fetcher'
import { AddWallet } from '@echo/ui/components/profile/wallet/add-wallet'
import { ConnectKitButton } from 'connectkit'
import { isNil } from 'ramda'
import { FunctionComponent, useCallback } from 'react'
import useSWRImmutable from 'swr/immutable'
import { useAccount } from 'wagmi'

interface Props {
  token: string | undefined
}
export const ConnectWallet: FunctionComponent<Props> = ({ token }) => {
  const getNonce = useCallback(() => getNonceFetcher(token), [token])
  const { address, isConnecting } = useAccount()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: response, error, isLoading } = useSWRImmutable('nonce', getNonce)
  if (error) {
    // TODO Catch the error?
    return null
  }
  if (isLoading) {
    // TODO Add loading button?
    return <button disabled>Loading...</button>
  }
  if (isConnecting) {
    // TODO Add connecting button?
    return <button disabled>Connecting...</button>
  }
  if (isNil(address)) {
    return <ConnectKitButton />
  }
  if (!isNil(response) && !isNil(response?.data)) {
    return <AddWallet nonce={response.data.nonce} token={token} address={address} />
  }
  // Should never happen
  return null
}
