'use client'
import { SelectableNftGroupCollapsible } from '@echo/ui/components/nft/group/selectable-nft-group-collapsible'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { type NftGroup } from '@echo/ui/types/nft-group'
import { motion } from 'framer-motion'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Omit<SelectableNftCardProps, 'nft'> {
  group: NftGroup
  style?: {
    collapsible?: boolean
  }
}

export const SelectableNftGroup: FunctionComponent<Props> = ({ group, style, ...cardProps }) => {
  if (style?.collapsible) {
    return <SelectableNftGroupCollapsible group={group} {...cardProps} />
  }
  return (
    <>
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
            <SelectableNftCard nft={nft} {...cardProps} />
          </motion.div>
        ),
        group.nfts
      )}
    </>
  )
}
