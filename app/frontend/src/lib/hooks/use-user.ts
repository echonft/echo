import { useFirebaseAuth, useUser as useFirebaseUser } from '@echo/firebase-react'

export const useUser = () => {
  const { auth } = useFirebaseAuth()
  const { data } = useFirebaseUser(auth.currentUser?.uid, { listen: true })
  return data
}
