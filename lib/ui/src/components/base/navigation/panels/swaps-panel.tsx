'use client'
import type { Swap } from '@echo/model/types/swap/swap'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
import { SwapDetailsModal } from '@echo/ui/components/swap/details/swap-details-modal'
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
  const [swap, setSwap] = useState<Nullable<Swap>>(isNil(selection) ? undefined : nth(selection, swaps))
  // TODO swap details
  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <SwapCards swaps={swaps} onSelect={pipe(assoc('role', undefined), setSwap)} />
        <SwapDetailsModal
          swap={swap}
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
