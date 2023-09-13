import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  collectionName: string
  tokenId: number
}

export const NftThumbnailTitle: FunctionComponent<Props> = ({ collectionName, tokenId }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1')}>
      <span className={clsx('prose-label-md', 'text-white/[0.65]', 'truncate')}>{collectionName}</span>
      <span className={clsx('prose-label-md-semi', 'text-white')}>{`#${tokenId}`}</span>
    </div>
  )
}
