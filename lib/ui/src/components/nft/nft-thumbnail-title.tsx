import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailTitleProps {
  collectionName: string
  title: string | undefined
  tokenId: bigint
}

export const NftThumbnailTitle: FunctionComponent<NftThumbnailTitleProps> = ({ collectionName, title, tokenId }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1')}>
      <span className={clsx('prose-label-md-semi', 'text-white/[0.65]')}>{title ?? collectionName}</span>
      <span className={clsx('prose-label-md-semi', 'text-white')}>{`#${tokenId.toString()}`}</span>
    </div>
  )
}
