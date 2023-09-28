'use client'
import { wagmiConfig } from '@constants/wagmi-config'
import { ConnectKitButton, ConnectKitProvider } from 'connectkit'
import { FunctionComponent } from 'react'
import { WagmiConfig } from 'wagmi'

export const ConnectButton: FunctionComponent = () => {
  // const { data, error } = await fetcher(profileNonceApiUrl()).fetch<NonceResponse>()
  //
  // if (isNil(data)) {
  //   if (!isNil(error)) {
  //     if ((error as ApiError).status === ErrorStatus.NOT_FOUND) {
  //       notFound()
  //     }
  //     throw Error(error.message)
  //   }
  //   throw Error()
  // }
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider>
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
