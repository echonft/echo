'use client'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { OwnedNft } from '@echo/model/types/nft'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import { SelectableNftThumbnails } from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnails'
import { SelectableNftsLayout } from '@echo/ui/components/nft/selectable/layout/selectable-nfts-layout'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { isEmpty, map } from 'ramda'
import { type FunctionComponent } from 'react'

export interface SelectableNftsProps extends Pick<SelectableNftCardProps, 'action' | 'options' | 'onAction'> {
  nfts: OwnedNft[]
  selection: OwnedNft[]
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
}

export const SelectableNfts: FunctionComponent<SelectableNftsProps> = ({
  nfts,
  selection,
  action,
  options,
  onAction,
  onSelect,
  onUnselect
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-8', 'grow')}>
      <SelectableNftThumbnails nfts={selection} onRemove={onUnselect} />
      <SelectableNftsLayout>
        {map(
          (nft) => (
            <motion.div
              key={serializeNft(nft)}
              layout={'position'}
              transition={{ ease: 'easeOut', duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SelectableNftCard
                nft={nft}
                action={isEmpty(selection) ? action : undefined}
                options={options}
                onSelect={onSelect}
                onAction={onAction}
              />
            </motion.div>
          ),
          nfts
        )}
      </SelectableNftsLayout>
    </div>
  )
}
