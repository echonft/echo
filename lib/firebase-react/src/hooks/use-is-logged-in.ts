import { useFirebase } from './use-firebase'
import { getAuth } from 'firebase/auth'
import { isNil } from 'ramda'
import { useEffect, useState } from 'react'

export function useIsLoggedIn(): boolean {
  const firebaseApp = useFirebase()
  const auth = getAuth(firebaseApp)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if (!isNil(auth) && !isNil(auth.currentUser)) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [auth])
  return isLoggedIn
}
