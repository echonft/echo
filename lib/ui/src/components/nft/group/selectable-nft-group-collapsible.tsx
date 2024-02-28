'use client'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { SelectableNftGroupCollapsibleLayout } from '@echo/ui/components/nft/group/layout/selectable-nft-group-collapsible-layout'
import { NftGroupButton } from '@echo/ui/components/nft/group/nft-group-button'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { getSelectionInList } from '@echo/ui/helpers/selectable/get-selection-in-list'
import { type NftGroup } from '@echo/ui/types/nft-group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { complement, isEmpty, map, pipe, prop } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props extends Omit<SelectableNftCardProps, 'nft'> {
  group: NftGroup
  style?: {
    collapsed?: boolean
  }
}

export const SelectableNftGroupCollapsible: FunctionComponent<Props> = ({
  group,
  options,
  style,
  onToggleSelection,
  onAction
}) => {
  const { label, nfts } = group
  const hasSelection = pipe(prop('nfts'), getSelectionInList<SelectableNft>, complement(isEmpty))(group)
  const [collapsed, setCollapsed] = useState(style?.collapsed ?? true)

  return (
    <SelectableNftGroupCollapsibleLayout>
      <NftGroupButton
        name={label}
        collapsed={collapsed ?? false}
        onToggleCollapsed={(collapsed) => {
          // can't collapse if at least one NFT is selected
          if (!collapsed && hasSelection) {
            return
          }
          setCollapsed(collapsed)
        }}
      />
      <Transition
        show={collapsed ?? false}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <CardsLayout>
          <AnimatePresence initial={false}>
            {map(
              (nft) => (
                <motion.div
                  key={nft.id}
                  layout={'position'}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SelectableNftCard
                    nft={nft}
                    options={options}
                    onToggleSelection={(nft) => {
                      onToggleSelection?.(nft)
                    }}
                    onAction={onAction}
                  />
                </motion.div>
              ),
              nfts
            )}
          </AnimatePresence>
        </CardsLayout>
      </Transition>
    </SelectableNftGroupCollapsibleLayout>
  )
}
