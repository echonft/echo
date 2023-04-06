import { useSession } from 'next-auth/react'

// TODO There should be a way to force the typing here
export const useUser = () => {
  const { data: session } = useSession()
  return session?.user
}
