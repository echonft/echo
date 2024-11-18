import type { User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { useSession } from 'next-auth/react'

export function useAuthUser(): Nullable<User> {
  const { data } = useSession()
  return data?.user
}
