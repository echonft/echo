'use client'
import type { Nft } from '@echo/model/types/nft'
import {
  TraitFilterPanel,
  type TraitFilterPanelProps
} from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { Transition } from '@headlessui/react'

interface Props<T extends Nft> extends TraitFilterPanelProps<T> {
  show: boolean
}

export const UserNftsTraitFilterPanel = <T extends Nft>({ show, ...rest }: Props<T>) => {
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
      <TraitFilterPanel {...rest} />
    </Transition>
  )
}
