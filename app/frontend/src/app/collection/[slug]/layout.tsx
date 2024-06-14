import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithSlug } from '@echo/model/types/with-slug'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'
import type { PropsWithChildren } from 'react'

type Props = PropsWithUser<PropsWithChildren<NextParams<WithSlug>>>

async function render({ params: { slug }, user, children }: Props) {
  const collection = await getCollection(slug)
  if (isNil(collection)) {
    notFound()
  }
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <CollectionDetails collection={collection} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default withUser(render)
