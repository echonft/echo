import { EmptyResponse, RemoveWalletRequest, userWalletApiUrl } from '@echo/api-public'
import { Wallet } from '@echo/ui-model'
import { fetcher } from '@lib/helpers/fetcher'
import useSWR from 'swr'

interface KeyData {
  url: URL
  request: RemoveWalletRequest
}

export const useRemoveWallet = (wallet: Wallet) =>
  useSWR<EmptyResponse, Error, KeyData>(
    {
      url: userWalletApiUrl(),
      request: {
        wallet
      }
    },
    ({ url, request }) => fetcher(url).method('DELETE').body(request).fetchResponse<EmptyResponse>()
  )
