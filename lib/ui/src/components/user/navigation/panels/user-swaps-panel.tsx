'use client'
import type { Swap } from '@echo/model/types/swap'
import { OfferDetailsModal } from '@echo/ui/components/offer/details/offer-details-modal'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { TabPanel } from '@headlessui/react'
import { assoc, pipe } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  swaps: Swap[]
  show?: boolean
}

export const UserSwapsPanel: FunctionComponent<Props> = ({ swaps, show }) => {
  const [swap, setSwap] = useState<OfferWithRole>()
  // TODO swap details
  if (show) {
    return (
      <TabPanel>
        <SwapCards swaps={swaps} onSelect={pipe(assoc('role', undefined), setSwap)} />
        <OfferDetailsModal
          offer={swap}
          onUpdate={setSwap}
          onClose={() => {
            setSwap(undefined)
          }}
        />
      </TabPanel>
    )
  }
  return null
}
