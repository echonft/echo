import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { UserNftsApiProvided } from '@echo/ui/components/user/api-provided/user-nfts-api-provided'
import { redirect } from 'next/navigation'

async function render({ params: { username } }: NextParams<Record<'username', string>>) {
  const user = await initializeServerComponent({ getAuthUser: true })
  if (user?.username === username) {
    redirect(linkProvider.profile.items.get())
  }
  const nfts = await getNftsForOwner(username, {
    orderBy: [{ field: 'tokenId', direction: 'asc' }]
  })
  return <UserNftsApiProvided username={username} nfts={nfts} />
}

export default withLocale(render)
