import { collectionApiUrl } from '@echo/api/routing/collection-api-url'
import { listingApiUrl } from '@echo/api/routing/listing-api-url'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { ListingDetailsApiProvided } from '@echo/ui/components/listing/api-provided/listing-details-api-provided'
import { isIn } from '@echo/utils/fp/is-in'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil, map, path, pipe } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
    id: string
  }
}

const ListingDetailsPage: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { slug, id } }) => {
  const session = await getServerSession(authOptions)
  const { data: collection } = await fetcher(collectionApiUrl(slug)).fetch<CollectionResponse>()
  const { data } = await fetcher(listingApiUrl(id)).fetch<ListingResponse>()

  if (isNil(data)) {
    throw Error()
  }
  if (!isNil(collection)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const listingSlugs = pipe(path(['listing', 'targets']), map(path(['collection', 'slug'])))(data) as string[]
    if (!isIn(listingSlugs, slug)) {
      notFound()
    }
  }

  return <ListingDetailsApiProvided listing={data.listing} user={session?.user} />
}

export default ListingDetailsPage
