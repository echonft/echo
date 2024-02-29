import { SelectableNftsLayout } from '@echo/ui/components/nft/group/layout/selectable-nfts-layout'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { AnimatePresence, motion } from 'framer-motion'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends Omit<SelectableNftCardProps, 'nft'> {
  nfts: SelectableNft[]
}

export const SelectableNfts: FunctionComponent<Props> = ({ nfts, ...cardProps }) => {
  return (
    <SelectableNftsLayout>
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
              <SelectableNftCard nft={nft} {...cardProps} />
            </motion.div>
          ),
          nfts
        )}
      </AnimatePresence>
    </SelectableNftsLayout>
  )
}
