import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailTitleProps {
  name: string
  tokenId: bigint
}

export const NftThumbnailTitle: FunctionComponent<NftThumbnailTitleProps> = ({ name, tokenId }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1')}>
      <span className={clsx('prose-label-md-bold', 'text-white/[0.65]')}>{name}</span>
      <span className={clsx('prose-label-md-bold', 'text-white')}>{`#${tokenId.toString()}`}</span>
    </div>
  )
}
