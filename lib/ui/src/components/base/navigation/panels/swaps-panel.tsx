'use client'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
import { SwapDetailsModal } from '@echo/ui/components/swap/details/swap-details-modal'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { find, isNil, nth, propEq } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  swaps: SwapWithRole[]
  selection?: Nullable<number>
  show?: boolean
}

export const SwapsPanel: FunctionComponent<Props> = ({ swaps, selection, show }) => {
  const [swap, setSwap] = useState<Nullable<SwapWithRole>>(isNil(selection) ? undefined : nth(selection, swaps))
  // TODO swap details
  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <SwapCards
          swaps={swaps}
          onSelect={(slug) => {
            setSwap(find<SwapWithRole>(propEq(slug, 'slug'), swaps))
          }}
        />
        <SwapDetailsModal
          swap={swap}
          onClose={() => {
            setSwap(undefined)
          }}
        />
      </TabPanel>
    )
  }
  return null
}
