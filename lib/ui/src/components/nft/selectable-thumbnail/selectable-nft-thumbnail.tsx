'use client'
import type { Nft } from '@echo/model/types/nft'
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
          'drop-shadow-md',
          'flex',
          'justify-center',
          'items-center',
          'z-10',
          !imgLoaded && 'hidden'
        )}
        onClick={onRemove}
      >
        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.29371 6.74634C1.40994 6.86256 1.59838 6.86256 1.71461 6.74634L4.05945 4.40149L6.4043 6.74634C6.52053 6.86256 6.70897 6.86256 6.8252 6.74634L7.24609 6.32544C7.36232 6.20921 7.36232 6.02077 7.24609 5.90454L4.90125 3.5597L7.24609 1.21485C7.36232 1.09863 7.36232 0.910184 7.24609 0.793956L6.8252 0.373059C6.70897 0.256832 6.52053 0.256832 6.4043 0.373059L4.05945 2.7179L1.71461 0.373059C1.59838 0.256832 1.40994 0.256832 1.29371 0.373059L0.872816 0.793956C0.756589 0.910184 0.756589 1.09863 0.872817 1.21485L3.21766 3.5597L0.872815 5.90454C0.756588 6.02077 0.756588 6.20921 0.872815 6.32544L1.29371 6.74634Z"
            fill="#FBFBFD"
          />
        </svg>
      </button>
    </motion.div>
  )
}
