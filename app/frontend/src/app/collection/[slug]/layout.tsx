import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { CollectionDetailsApiProvided } from '@echo/ui/components/collection/api-provided/collection-details-api-provided'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'

async function render({ params: { slug }, children }: NextLayoutParams<NextParams<Record<'slug', string>>>) {
  const user = await initializeServerComponent({ getAuthUser: true })
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

export default withLocale(render)
