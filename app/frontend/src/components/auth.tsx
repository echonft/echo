import { useSession } from 'next-auth/react'
import { FunctionComponent, PropsWithChildren } from 'react'

export const Auth: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { status } = useSession({
    required: true
  })

  if (status === 'loading') {
    return <>'Loading or not authenticated...'</>
  }

  return <>{children}</>
}
