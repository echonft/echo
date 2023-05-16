import { useFirebaseAuth, useUser as useFirebaseUser } from '@echo/firebase-react'
import { isNil } from 'ramda'

export const useUser = () => {
  const { auth } = useFirebaseAuth()

  if (isNil(auth.currentUser)) {
    throw `Not logged in`
  }

  const { data } = useFirebaseUser(auth.currentUser.uid, { listen: true })
  return data
}
