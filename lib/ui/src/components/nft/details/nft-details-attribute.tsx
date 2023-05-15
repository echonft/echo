import { NftAttribute } from '@echo/model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftDetailsAttributeProps {
  attribute: NftAttribute
}

export const NftDetailsAttribute: FunctionComponent<NftDetailsAttributeProps> = ({ attribute }) => {
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
      <p className={clsx('prose-label-md', 'text-yellow-500')}>{attribute.traitType}</p>
      <p className={clsx('prose-label-lg', 'text-white')}>{attribute.value}</p>
    </div>
  )
}
