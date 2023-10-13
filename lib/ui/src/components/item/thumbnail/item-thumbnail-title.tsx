import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  collectionName: string
  tokenId: number
}

export const ItemThumbnailTitle: FunctionComponent<Props> = ({ collectionName, tokenId }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1')}>
      <span className={clsx('prose-label-caps-sm', 'text-white/[0.65]', 'truncate', '!normal-case')}>
        {collectionName}
      </span>
      <span className={clsx('prose-label-caps-sm', 'text-white', '!normal-case')}>{`#${tokenId}`}</span>
    </div>
  )
}
