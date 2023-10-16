import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  attribute: NftAttribute
}

export const NftDetailsAttribute: FunctionComponent<Props> = ({ attribute }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'w-[20rem]',
        'bg-white/[0.08]',
        'rounded-2xl',
        'px-2',
        'pt-2.5',
        'pb-6',
        'gap-2'
      )}
    >
      <p className={clsx('prose-label-md', 'text-yellow-500')}>{attribute.trait}</p>
      <p className={clsx('prose-label-lg', 'text-white')}>{attribute.value}</p>
    </div>
  )
}
