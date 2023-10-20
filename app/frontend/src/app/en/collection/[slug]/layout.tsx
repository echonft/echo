import { collectionApiUrl } from '@echo/api/routing/collection-api-url'
import { type CollectionResponse } from '@echo/api/types/responses/collection-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { CollectionDetailsApiProvided } from '@echo/ui/components/collection/api-provided/collection-details-api-provided'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { slug }, children }) => {
  const session = await getServerSession(authOptions)
  const { data, error } = await fetcher(collectionApiUrl(slug)).fetch<CollectionResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      if ((error as ApiError).status === ErrorStatus.NOT_FOUND) {
        notFound()
      }
      throw Error(error.message)
    }
    throw Error()
  }

  return (
    <NavigationPageLayout user={session?.user}>
      <SectionLayout>
        <CollectionDetailsApiProvided collection={data.collection} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default CollectionLayout
