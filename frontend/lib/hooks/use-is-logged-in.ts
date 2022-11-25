import { useGetFirebaseAuth } from '@lib/services/firebase/hooks/use-get-firebase-auth'
import { isNil } from 'rambda'
import { useEffect, useState } from 'react'

export function useIsLoggedIn() {
  const { auth, error } = useGetFirebaseAuth()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>()

  useEffect(() => {
    if (!isNil(auth) && isNil(error)) {
      setIsLoggedIn(isNil(error) && !isNil(auth?.currentUser))
    }
  }, [auth, error])
  return isLoggedIn
}
