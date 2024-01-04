import { ProfileSwapsSkeleton } from '@echo/ui/components/profile/swap/skeleton/profile-swaps-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const ProfileSwapsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <ProfileSwapsSkeleton />
}

export default ProfileSwapsLoading
