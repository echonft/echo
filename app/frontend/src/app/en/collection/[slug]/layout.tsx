import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { assertNextFetchResponse } from '@echo/frontend/lib/services/fetch/assert-next-fetch-response'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import { CollectionDetailsApiProvided } from '@echo/ui/components/collection/api-provided/collection-details-api-provided'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params, children }) => {
  const user = await getAuthUser()
  const response = await nextFetch.get<CollectionResponse>(apiUrlProvider.collection.get.getUrl(params))
  assertNextFetchResponse(response)
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <CollectionDetailsApiProvided collection={response.data.collection} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default CollectionLayout
