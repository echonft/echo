import { SizeLG, SizeMD } from '../../types/size'
import { NftThumbnailSize } from './nft-thumbnail-size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailOfferTitleProps {
  collectionName: string
  name: string | undefined
  tokenId: number
  size?: NftThumbnailSize
}

export const NftThumbnailOfferTitle: FunctionComponent<NftThumbnailOfferTitleProps> = ({
  collectionName,
  name,
  tokenId,
  size
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1')}>
      <span
        className={clsx(
          size === SizeMD && 'prose-label-caps-sm',
          size === SizeLG && 'prose-paragraph-md',
          'text-white/[0.65]',
          'truncate',
          '!normal-case'
        )}
      >
        {name ?? collectionName}
      </span>
      <span
        className={clsx(
          size === SizeMD && 'prose-label-caps-sm',
          size === SizeLG && 'prose-paragraph-md',
          'text-white',
          '!normal-case'
        )}
      >{`#${tokenId}`}</span>
    </div>
  )
}
