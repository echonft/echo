'use client'
import type { Nft } from '@echo/model/types/nft'
import {
  TraitFilterPanel,
  type TraitFilterPanelProps
} from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { Transition } from '@headlessui/react'
import { useEffect, useRef } from 'react'

interface Props<T extends Nft> extends TraitFilterPanelProps<T> {
  show: boolean
}

export const ProfileNftsTraitFilterPanel = <T extends Nft>({ show, nfts, onNftsFiltered }: Props<T>) => {
  // we need to keep a reference to previous NFTs so that the filters don't get updated
  // during the exit animation
  const nftsRef = useRef(nfts)
  useEffect(() => {
    if (show) {
      nftsRef.current = nfts
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
      <TraitFilterPanel nfts={show ? nfts : nftsRef.current} onNftsFiltered={onNftsFiltered} />
    </Transition>
  )
}
