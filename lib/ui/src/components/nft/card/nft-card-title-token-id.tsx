import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithClassNameProps {
  tokenId: number
  totalSupply: number
}

export const NftCardTitleTokenId: FunctionComponent<Props> = ({ tokenId, totalSupply, className }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.875rem]',
        'font-normal',
        'leading-[0.9375rem]',
        'tracking-[0.0175rem]',
        'text-white/70',
        'truncate',
        className
      )}
    >
      {`#${tokenId.toString().padStart(Math.ceil(Math.log10(totalSupply)), '0')}`}
    </p>
  )
}
