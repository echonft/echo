import { useCollection } from '@echo/firebase-react'
import { User } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { limit, where } from 'firebase/firestore'
import { head, pipe, prop } from 'ramda'
import { useAccount } from 'wagmi'

export const useUser = () => {
  const { address } = useAccount()
  return pipe(
    prop('data'),
    R.map(head)
  )(useCollection<User>('users', { constraints: [where('wallet', '==', address), limit(1)] }))
}
