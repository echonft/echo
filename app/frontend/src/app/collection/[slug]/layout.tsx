import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { CollectionDetailsApiProvided } from '@echo/ui/components/collection/api-provided/collection-details-api-provided'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { notFound } from 'next/navigation'
import { isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextLayoutParams<NextParams<Record<'slug', string>>>>
async function render({ params: { slug }, user, children }: Params) {
  const collection = await findCollectionBySlug(slug)
  if (isNil(collection)) {
    notFound()
  }
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <CollectionDetailsApiProvided collection={collection} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
