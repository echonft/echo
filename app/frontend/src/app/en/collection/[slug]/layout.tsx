import { collectionApiUrl } from '@echo/api/routing/collection-api-url'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { CollectionDetailsApiProvided } from '@echo/ui/components/collection/api-provided/collection-details-api-provided'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { slug }, children }) => {
  const session = await getServerSession(authOptions)
  const result = await fetcher(collectionApiUrl(slug)).fetch<CollectionResponse>()
  assertFetchResult(result)
  return (
    <NavigationPageLayout user={session?.user}>
      <SectionLayout>
        <CollectionDetailsApiProvided collection={result.data.collection} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default CollectionLayout
