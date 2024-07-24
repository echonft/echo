'use client'
import { OfferCards } from '@echo/ui/components/offer/card/offer-cards'
import { OfferDetailsModal } from '@echo/ui/components/offer/details/offer-details-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { isNil, nth } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offers: OfferWithRole[]
  selection?: Nullable<number>
  show?: boolean
}

export const OffersPanel: FunctionComponent<Props> = ({ offers, selection, show }) => {
  const [offer, setOffer] = useState<Nullable<OfferWithRole>>(isNil(selection) ? undefined : nth(selection, offers))

  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
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
