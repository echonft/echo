import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { toListingWithRole } from '@echo/frontend/lib/helpers/listing/to-listing-with-role'
import type { User } from '@echo/model/types/user'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { andThen, isNil, pipe } from 'ramda'

interface ListingPageProps {
  params: {
    slug: Lowercase<string>
  }
  user: Nullable<User>
}

async function render({ params: { slug }, user }: ListingPageProps) {
  const listing = await pipe(getListing, andThen(unlessNil(toListingWithRole(user))))(slug)

  if (isNil(listing)) {
    notFound()
  }

  return (
    <PageLayout>
      <Header />
      <MainSectionLayout>
        <ListingDetails listing={listing} />
      </MainSectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
