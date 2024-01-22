import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { withFirebase } from '@echo/frontend/lib/hoc/with-firebase'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { CollectionSwapsApiProvided } from '@echo/ui/components/collection/api-provided/collection-swaps-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionSwapsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  unstable_setRequestLocale('en')
  const offers = await getOffersForCollection(
    slug,
    { state: [OFFER_STATE_COMPLETED] },
    {
      orderBy: [{ field: 'expiresAt', direction: 'asc' }]
    }
  )
  return <CollectionSwapsApiProvided collectionSlug={slug} offers={offers} />
}

export default withFirebase(CollectionSwapsPage)
