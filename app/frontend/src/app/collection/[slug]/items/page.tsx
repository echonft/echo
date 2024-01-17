import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { CollectionResponse } from '@echo/api/types/responses/collection-response'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getCookieHeader } from '@echo/frontend/lib/helpers/auth/get-cookie-header'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { CollectionNftsApiProvided } from '@echo/ui/components/collection/api-provided/collection-nfts-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionNftsPage: FunctionComponent<Props> = async ({ params }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  const query = mapQueryConstraintsToQueryParams({
    orderBy: [
      { field: 'owner.discord.username', direction: 'asc' },
      { field: 'tokenId', direction: 'asc' }
    ]
  })
  const response = await nextFetch.get<NftsResponse>(apiUrlProvider.collection.nfts.getUrl(params), {
    cookie: getCookieHeader(),
    params: query
  })
  assertNextFetchResponse(response)

  const collectionResponse = await nextFetch.get<CollectionResponse>(apiUrlProvider.collection.get.getUrl(params), {
    cookie: getCookieHeader()
  })
  assertNextFetchResponse(collectionResponse)
  return (
    <CollectionNftsApiProvided collection={collectionResponse.data.collection} nfts={response.data.nfts} user={user} />
  )
}

export default CollectionNftsPage
