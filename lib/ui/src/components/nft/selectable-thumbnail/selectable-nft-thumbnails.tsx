import type { Nft } from '@echo/model/types/nft'
import { keyOf } from '@echo/ui/components/nft/key-of'
import { SelectableNftThumbnail } from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnail'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { isEmpty, map } from 'ramda'
import type { FunctionComponent } from 'react'

export interface SelectableNftThumbnailContainerProps {
  nfts: Nft[]
  style?: {
    minWitdh?: boolean
  }
  onRemove?: (nft: Nft) => unknown
}

export const SelectableNftThumbnails: FunctionComponent<SelectableNftThumbnailContainerProps> = ({
  nfts,
  style,
  onRemove
}) => {
  if (isEmpty(nfts)) {
    return null
  }
  return (
    <motion.div
      layout
      className={clsx(
        'flex',
        'flex-row',
        'flex-wrap',
        'w-full',
        'h-max',
        'gap-2.5',
        'rounded-3xl',
        'border-2',
        'border-dark-400',
        'p-4',
        style?.minWitdh && 'min-w-[28rem]'
      )}
    >
      <AnimatePresence initial={false}>
        {map(
          (nft) => (
            <SelectableNftThumbnail
              key={keyOf(nft)}
              nft={nft}
              onRemove={() => {
                onRemove?.(nft)
              }}
            />
          ),
          nfts
        )}
      </AnimatePresence>
    </motion.div>
  )
}
