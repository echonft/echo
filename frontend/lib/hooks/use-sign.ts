import { SwrKey } from '@lib/constants/swr-key'
import { useSignInMessage } from '@lib/hooks/use-sign-in-message'
import useSWRImmutable from 'swr/immutable'
import { useSignMessage } from 'wagmi'

// TODO Use Result
export const useSign = (nonce?: string) => {
  const message = useSignInMessage(nonce)
  const { signMessageAsync, status } = useSignMessage()
  const { data, error } = useSWRImmutable(message && SwrKey.SIGN_MESSAGE, () => {
    if (status === 'idle') {
      return signMessageAsync({ message: message! })
    }
  })
  return { signature: data, message, status, error }
}
