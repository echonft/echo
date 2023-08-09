import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailOfferTitleProps {
  collectionName: string
  name: string | undefined
  tokenId: number
}

export const NftThumbnailOfferTitle: FunctionComponent<NftThumbnailOfferTitleProps> = ({
  collectionName,
  name,
  tokenId
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1', 'p-2')}>
      <span className={clsx('prose-label-caps-sm', 'text-white/[0.65]', 'truncate', '!normal-case')}>
        {name ?? collectionName}
      </span>
      <span className={clsx('prose-label-caps-sm', 'text-white', '!normal-case')}>{`#${tokenId}`}</span>
    </div>
  )
}
