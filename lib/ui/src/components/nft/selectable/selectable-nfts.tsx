'use client'
import type { Nft } from '@echo/model/types/nft'
import { keyOf } from '@echo/ui/components/nft/key-of'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import {
  type SelectableNftThumbnailContainerProps,
  SelectableNftThumbnails
} from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnails'
import { SelectableNftsLayout } from '@echo/ui/components/nft/selectable/layout/selectable-nfts-layout'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { isEmpty, map } from 'ramda'
import { type FunctionComponent } from 'react'

export interface SelectableNftsProps extends Pick<SelectableNftCardProps, 'action' | 'options' | 'onAction'> {
  nfts: Nft[]
  selection: Nft[]
  style?: {
    selectionContainer?: SelectableNftThumbnailContainerProps['style']
  }
  onSelect?: (nft: Nft) => unknown
  onUnselect?: (nft: Nft) => unknown
}

export const SelectableNfts: FunctionComponent<SelectableNftsProps> = ({
  nfts,
  selection,
  action,
  options,
  style,
  onAction,
  onSelect,
  onUnselect
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-8', 'grow')}>
      <SelectableNftThumbnails nfts={selection} onRemove={onUnselect} style={style?.selectionContainer} />
      <SelectableNftsLayout>
        {map(
          (nft) => (
            <motion.div
              key={keyOf(nft)}
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
