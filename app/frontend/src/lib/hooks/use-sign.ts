import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty } from '@echo/utils'
import { useSignInMessage } from '@lib/hooks/use-sign-in-message'
import { R } from '@mobily/ts-belt'
import { always, pipe, prop, useWith } from 'ramda'
import useSWRImmutable from 'swr/immutable'
import { useSignMessage } from 'wagmi'

type SignatureType = `0x${string}` | undefined

interface KeyData {
  message: string | undefined
}

export const useSign = (nonce: string | undefined) => {
  const message = useSignInMessage(nonce)
  const { signMessageAsync, status } = useSignMessage()
  return useSWRImmutable<R.Result<SignatureType, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      { name: SwrKeyNames.WALLET_SIGN_MESSAGE, data: { message } },
      always(isNilOrEmpty(message) || status !== 'idle')
    ),
    pipe(
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useWith(signMessageAsync, [
        prop<{
          message: string
        }>('data')
      ]),
      R.fromPromise
    )
  )
}
