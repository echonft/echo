'use client'
import type { Swap } from '@echo/model/types/swap'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
import { SwapDetailsModal } from '@echo/ui/components/swap/details/swap-details-modal'
import type { Nullable } from '@echo/utils/types/nullable'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { find, isNil, nth, pipe, propEq } from 'ramda'
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
        <SwapCards
          swaps={swaps}
          onSelect={(slug) => {
            pipe(find<Swap>(propEq(slug, 'slug')), setSwap)(swaps)
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
