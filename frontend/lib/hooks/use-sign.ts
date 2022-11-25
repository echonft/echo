import { useSignInMessage } from '@lib/hooks/use-sign-in-message'
import { SwrKey } from '@lib/services/swr/constants/swr-key'
import { isEmpty, isNil } from 'rambda'
import useSWRImmutable from 'swr/immutable'
import { useSignMessage } from 'wagmi'

type SignatureType = `0x${string}` | undefined

// TODO Use Result
export const useSign = (nonce?: string) => {
  const message = useSignInMessage(nonce)
  const { signMessageAsync, status } = useSignMessage()
  const { data, error } = useSWRImmutable<SignatureType, Error>(
    !isNil(message) && !isEmpty(message) && status === 'idle' && SwrKey.SIGN_MESSAGE,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => signMessageAsync({ message })
  )
  return { signature: data, message, status, error }
}
