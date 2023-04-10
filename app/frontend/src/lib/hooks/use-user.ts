import { useFirebaseAuth, useUser as useFirebaseUser } from '@echo/firebase-react'

// TODO There should be a way to force the typing here
export const useUser = () => {
  const { auth } = useFirebaseAuth()
  const { data } = useFirebaseUser(auth.currentUser?.uid)
  return data
}
