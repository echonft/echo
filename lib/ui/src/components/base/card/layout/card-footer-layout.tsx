import { CARD_VARIANT_REDUCED } from '@echo/ui/constants/card-variants'
import type { CardVariant } from '@echo/ui/types/card-variant'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {
  variant?: CardVariant
}

export const CardFooterLayout: FunctionComponent<Props> = ({ variant, loading, children }) => {
  return (
    <div
      className={clsx(
        'w-full',
        'min-w-0',
        'h-max',
        'rounded-b-2xl',
        'px-2.75',
        isNil(variant) && ['pt-5', 'pb-6'],
        variant === CARD_VARIANT_REDUCED && ['pt-1.25', 'pb-3.25'],
        loading && 'invisible'
      )}
    >
      {children}
    </div>
  )
}
