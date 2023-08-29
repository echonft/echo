import { EmptyResponse, RemoveWalletRequest, userWalletApiUrl } from '@echo/api-public'
import { Wallet } from '@echo/ui-model'
import { deleteData } from '@echo/utils'
import { converge, prop } from 'ramda'
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    converge(deleteData, [prop('url'), prop('request')])
  )
