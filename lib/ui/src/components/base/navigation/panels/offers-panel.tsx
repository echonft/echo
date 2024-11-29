'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { OfferCards } from '@echo/ui/components/offer/card/offer-cards'
import { OfferDetailsModal } from '@echo/ui/components/offer/details/offer-details-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { find, isNil, nth, pipe, propEq } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offers: OfferWithRole[]
  selection?: Nullable<number>
  show?: boolean
}

export const OffersPanel: FunctionComponent<Props> = ({ offers, selection, show }) => {
  const router = useRouter()
  const [offer, setOffer] = useState<Nullable<OfferWithRole>>(isNil(selection) ? undefined : nth(selection, offers))

  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <OfferCards
          offers={offers}
          onSelect={(slug) => {
            pipe(find<OfferWithRole>(propEq(slug, 'slug')), setOffer)(offers)
          }}
        />
        <OfferDetailsModal
          offer={offer}
          onRedeem={() => {
            // redirect the user to their profile so they can see their NFTs
            router.push(frontendRoutes.user.profile.get())
          }}
          onSwap={() => {
            if (!isNil(offer)) {
              router.push(frontendRoutes.swap.details.withQuery({ swap: offer }).get())
            }
          }}
          onUpdate={setOffer}
          onClose={() => {
            setOffer(undefined)
          }}
        />
      </TabPanel>
    )
  }
  return null
}
