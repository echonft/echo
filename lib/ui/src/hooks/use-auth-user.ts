import type { User } from '@echo/model/types/user'
import { AuthUserStatus } from '@echo/ui/constants/auth-user-status'
import { useSession } from 'next-auth/react'

export type UseAuthUserReturn =
  | {
      status: AuthUserStatus.Loading | AuthUserStatus.Unauthenticated
      user: undefined
    }
  | {
      status: AuthUserStatus.Authenticated
      user: User
    }
export function useAuthUser(): UseAuthUserReturn {
  const { status, data } = useSession()
  if (status === 'loading') {
    return { status: AuthUserStatus.Loading, user: undefined }
  }
  if (status === 'unauthenticated') {
    return { status: AuthUserStatus.Unauthenticated, user: undefined }
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { status: AuthUserStatus.Authenticated, user: data!.user! }
}
