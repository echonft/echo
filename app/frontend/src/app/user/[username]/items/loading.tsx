import { UserNftsSkeleton } from '@echo/ui/components/user/nft/skeleton/user-nfts-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const UserNftsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <UserNftsSkeleton />
}

export default UserNftsLoading
