import { UserSwapsSkeleton } from '@echo/ui/components/user/swap/skeleton/user-swaps-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const UserSwapsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <UserSwapsSkeleton />
}

export default UserSwapsLoading
