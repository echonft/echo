import { ProfileNftsSkeleton } from '@echo/ui/components/profile/nft/skeleton/profile-nfts-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const ProfileNftsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <ProfileNftsSkeleton />
}

export default ProfileNftsLoading
