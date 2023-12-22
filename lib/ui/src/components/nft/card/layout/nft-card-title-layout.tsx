import { NFT_CARD_VARIANT_REDUCED } from '@echo/ui/constants/nft-card-variants'
import type { NftCardVariant } from '@echo/ui/types/nft-card-variant'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {
  variant?: NftCardVariant
}

export const NftCardTitleLayout: FunctionComponent<Props> = ({ variant, loading, children }) => {
  return (
    <div
      className={clsx(
        'w-full',
        'min-w-0',
        'h-max',
        'rounded-b-2xl',
        'px-2.75',
        isNil(variant) && ['pt-5', 'pb-6'],
        variant === NFT_CARD_VARIANT_REDUCED && ['pt-1.25', 'pb-3.25'],
        loading && 'invisible'
      )}
    >
      {children}
    </div>
  )
}
