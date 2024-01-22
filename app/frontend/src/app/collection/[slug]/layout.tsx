import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { withFirebase } from '@echo/frontend/lib/hoc/with-firebase'
import { CollectionDetailsApiProvided } from '@echo/ui/components/collection/api-provided/collection-details-api-provided'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { slug }, children }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
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

export default withFirebase(CollectionLayout)
