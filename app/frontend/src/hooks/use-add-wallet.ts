import { AddWalletRequest, EmptyResponse, userWalletApiUrl } from '@echo/api-public'
import { Signature, Wallet } from '@echo/ui-model'
import { putData } from '@echo/utils'
import { converge, prop } from 'ramda'
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    converge(putData, [prop('url'), prop('request')])
  )
