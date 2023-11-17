import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
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

const CollectionLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params, children }) => {
  const session = await getServerSession(authOptions)
  const response = await nextFetch.get<CollectionResponse>(apiUrlProvider.collection.get.get(params))
  assertNextFetchResponse(response)
  return (
    <NavigationPageLayout user={session?.user}>
      <SectionLayout>
        <CollectionDetailsApiProvided collection={response.data.collection} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default CollectionLayout
