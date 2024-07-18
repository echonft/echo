'use client'
import { OfferCards } from '@echo/ui/components/offer/card/offer-cards'
import { OfferDetailsModal } from '@echo/ui/components/offer/details/offer-details-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { TabPanel } from '@headlessui/react'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offers: OfferWithRole[]
  show?: boolean
}

export const UserOffersPanel: FunctionComponent<Props> = ({ offers, show }) => {
  const [offer, setOffer] = useState<OfferWithRole>()

  if (show) {
    return (
      <TabPanel>
        <OfferCards offers={offers} onSelect={setOffer} />
        <OfferDetailsModal
          offer={offer}
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
