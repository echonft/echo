'use client'
import {
  TraitFilterPanel,
  type TraitFilterPanelProps
} from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { Transition } from '@headlessui/react'
import { type FunctionComponent, useEffect, useRef } from 'react'

interface Props extends TraitFilterPanelProps {
  show: boolean
}

export const TraitFilterPanelVisibilityManager: FunctionComponent<Props> = ({
  show,
  nfts,
  selection,
  onToggleSelection
}) => {
  // we need to keep a reference to previous filters so that they don't get updated during the exit animation
  const filtersRef = useRef(nfts)
  useEffect(() => {
    if (show) {
      filtersRef.current = nfts
    }
  }, [show, nfts])

  return (
    <Transition
      show={show}
      enter="transition duration-250 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-150 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <TraitFilterPanel
        nfts={show ? nfts : filtersRef.current}
        selection={selection}
        onToggleSelection={onToggleSelection}
      />
    </Transition>
  )
}
