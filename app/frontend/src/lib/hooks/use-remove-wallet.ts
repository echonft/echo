import { fetcher } from '../helpers/fetcher'
import { EmptyResponse, RemoveWalletRequest, userWalletApiUrl } from '@echo/api'
import { Wallet } from '@echo/ui-model'
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
