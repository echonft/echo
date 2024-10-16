'use client'
import type { Swap } from '@echo/model/types/offer/swap'
import { OfferDetailsModal } from '@echo/ui/components/offer/details/offer-details-modal'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { assoc, isNil, nth, pipe } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  swaps: Swap[]
  selection?: Nullable<number>
  show?: boolean
}

export const SwapsPanel: FunctionComponent<Props> = ({ swaps, selection, show }) => {
  const [swap, setSwap] = useState<Nullable<OfferWithRole>>(
    isNil(selection) ? undefined : pipe(nth(selection), assoc('role', undefined))(swaps)
  )
  // TODO swap details
  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
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
