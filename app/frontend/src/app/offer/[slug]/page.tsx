import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { toOfferWithRole } from '@echo/frontend/lib/helpers/offer/to-offer-with-role'
import type { User } from '@echo/model/types/user'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { andThen, isNil, pipe } from 'ramda'

interface OfferPageProps {
  params: {
    slug: Lowercase<string>
  }
  user: Nullable<User>
}

async function render({ params: { slug }, user }: OfferPageProps) {
  const offer = await pipe(getOffer, andThen(unlessNil(toOfferWithRole(user))))(slug)

  if (isNil(offer)) {
    notFound()
  }

  return (
    <PageLayout>
      <Header />
      <MainSectionLayout>
        <OfferDetails offer={offer} />
      </MainSectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
