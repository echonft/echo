import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { UserNftsApiProvided } from '@echo/ui/components/user/api-provided/user-nfts-api-provided'
import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserNftsPage: FunctionComponent<Props> = async ({ params: { username } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  if (user?.username === username) {
    redirect(linkProvider.profile.items.get())
  }
  const nfts = await getNftsForOwner(username, {
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  return <UserNftsApiProvided username={username} nfts={nfts} />
}

export default UserNftsPage
