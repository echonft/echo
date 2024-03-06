import type { Nft } from '@echo/model/types/nft'
import { SelectableNftThumbnail } from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnail'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { isEmpty, map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  onRemove?: (nft: Nft) => unknown
}

export const SelectableNftThumbnailContainer: FunctionComponent<Props> = ({ nfts, onRemove }) => {
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
        'p-4'
      )}
    >
      <AnimatePresence initial={false}>
        {map(
          (nft) => (
            <SelectableNftThumbnail
              key={nft.id}
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
