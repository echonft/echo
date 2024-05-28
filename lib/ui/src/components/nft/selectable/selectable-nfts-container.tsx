'use client'
import type { Nft } from '@echo/model/types/nft'
import { SelectableNftsLayout } from '@echo/ui/components/nft/group/layout/selectable-nfts-layout'
import { keyOf } from '@echo/ui/components/nft/key-of'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import {
  SelectableNftThumbnailContainer,
  type SelectableNftThumbnailContainerProps
} from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnail-container'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { enableAction } from '@echo/ui/helpers/nft/enable-action'
import { sortNftsByCollection } from '@echo/ui/helpers/nft/sort/sort-nfts-by-collection'
import { sortNftsByOwner } from '@echo/ui/helpers/nft/sort/sort-nfts-by-owner'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

export interface SelectableNftsContainerProps extends Pick<SelectableNftCardProps, 'options' | 'onAction'> {
  nfts: Nft[]
  selection: SelectableNft[]
  sortBy: 'collection' | 'owner'
  style?: {
    selectionContainer?: SelectableNftThumbnailContainerProps['style']
  }
  onSelect?: (nft: SelectableNft) => unknown
  onUnselect?: (nft: SelectableNft) => unknown
}

export const SelectableNftsContainer: FunctionComponent<SelectableNftsContainerProps> = ({
  nfts,
  sortBy,
  selection,
  options,
  style,
  onAction,
  onSelect,
  onUnselect
}) => {
  // update selectable NFTs when underlying NFTs or selection change
  const selectableNfts = useMemo<SelectableNft[]>(() => {
    const selectionEmpty = isEmpty(selection)
    const actionFn = selectionEmpty ? enableAction : disableAction
    const sortFn = sortBy === 'collection' ? sortNftsByCollection : sortNftsByOwner
    return pipe(map(actionFn), sortFn)(nfts)
  }, [nfts, sortBy, selection])

  return (
    <div className={clsx('flex', 'flex-col', 'gap-8')}>
      <SelectableNftThumbnailContainer nfts={selection} onRemove={onUnselect} style={style?.selectionContainer} />
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
              <SelectableNftCard nft={nft} options={options} onSelect={onSelect} onAction={onAction} />
            </motion.div>
          ),
          selectableNfts
        )}
      </SelectableNftsLayout>
    </div>
  )
}
