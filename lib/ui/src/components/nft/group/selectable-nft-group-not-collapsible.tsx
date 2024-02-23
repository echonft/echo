'use client'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { type NftGroup } from '@echo/ui/types/nft-group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { AnimatePresence, motion } from 'framer-motion'
import { map, pipe, prop } from 'ramda'
import { type FunctionComponent, type ReactNode } from 'react'

interface Props extends Omit<SelectableNftCardProps, 'nft'> {
  group: NftGroup
}

export const SelectableNftGroupNotCollapsible: FunctionComponent<Props> = ({
  group,
  options,
  onToggleSelection,
  onAction
}) => {
  return (
    <AnimatePresence initial={false}>
      {pipe<[NftGroup], SelectableNft[], ReactNode[]>(
        prop('items'),
        map((nft) => (
          <motion.div
            key={nft.id}
            layout={'position'}
            transition={{ ease: 'easeOut', duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SelectableNftCard nft={nft} options={options} onToggleSelection={onToggleSelection} onAction={onAction} />
          </motion.div>
        ))
      )(group)}
    </AnimatePresence>
  )
}
