import { AddWalletRequest, EmptyResponse, userWalletApiUrl } from '@echo/api-public'
import { Signature, Wallet } from '@echo/ui-model'
import { fetcher } from '@lib/helpers/fetcher'
import { SiweMessage } from 'siwe'
import useSWR from 'swr'

interface KeyData {
  url: URL
  request: AddWalletRequest
}

export const useAddWallet = (message: SiweMessage, signature: Signature, wallet: Wallet) =>
  useSWR<EmptyResponse, Error, KeyData>(
    {
      url: userWalletApiUrl(),
      request: {
        wallet,
        message,
        signature
      }
    },
    ({ url, request }) => fetcher(url).method('PUT').body(request).fetchResponse<EmptyResponse>()
  )
