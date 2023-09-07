import { OfferItemThumbnailSize } from '../../constants/offer-item-thumbnail-size'
import { SizeLG, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  collectionName: string
  tokenId: number
  size: OfferItemThumbnailSize
}

export const OfferItemThumbnailTitle: FunctionComponent<Props> = ({ collectionName, tokenId, size }) => {
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
        {collectionName}
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
