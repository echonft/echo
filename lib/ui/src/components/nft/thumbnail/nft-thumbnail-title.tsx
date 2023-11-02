import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  collectionName: string
  tokenId: number
}

export const NftThumbnailTitle: FunctionComponent<Props> = ({ collectionName, tokenId }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'w-full',
        'min-w-0',
        'justify-between',
        'items-center',
        'h-max',
        'bg-white/[0.08]',
        'p-2',
        'gap-1'
      )}
    >
      <span className={clsx('prose-label-md', 'text-white/[0.65]', 'truncate')}>{collectionName}</span>
      <span className={clsx('prose-label-md-semi', 'text-white')}>{`#${tokenId}`}</span>
    </div>
  )
}
