import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailTitleProps {
  collectionName: string
  tokenId: number
}

export const NftThumbnailTitle: FunctionComponent<NftThumbnailTitleProps> = ({ collectionName, tokenId }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1')}>
      <span className={clsx('prose-label-md-semi', 'text-white/[0.65]', 'truncate')}>{collectionName}</span>
      <span className={clsx('prose-label-md-semi', 'text-white')}>{`#${tokenId}`}</span>
    </div>
  )
}
