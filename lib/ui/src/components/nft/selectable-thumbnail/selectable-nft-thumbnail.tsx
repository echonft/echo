'use client'
import type { Nft } from '@echo/model/types/nft'
import { RemoveIconSvg } from '@echo/ui/components/base/svg/remove-icon-svg'
import { SelectableNftThumbnailImage } from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnail-image'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { type FunctionComponent, useState } from 'react'

interface Props {
  nft: Nft
  onRemove?: VoidFunction
}

export const SelectableNftThumbnail: FunctionComponent<Props> = ({ nft, onRemove }) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  return (
    <motion.div
      className={clsx(
        'h-32',
        'w-32',
        'rounded-2xl',
        'relative',
        'overflow-hidden',
        'group',
        'border',
        'border-solid',
        'border-white/10'
      )}
      layout={'position'}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SelectableNftThumbnailImage
        nft={nft}
        onLoadComplete={() => {
          setImgLoaded(true)
        }}
      />
      <button
        className={clsx(
          'absolute',
          'top-2',
          'right-2',
          'w-4',
          'h-4',
          'rounded-full',
          'bg-red-500',
          'text-neutral-200',
          'drop-shadow-md',
          'flex',
          'justify-center',
          'items-center',
          'z-10',
          !imgLoaded && 'hidden'
        )}
        onClick={onRemove}
      >
        <RemoveIconSvg />
      </button>
    </motion.div>
  )
}
