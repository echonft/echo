import { CardSkeleton } from '@echo/ui/components/base/card/skeleton/card-skeleton'
import type { CardVariant } from '@echo/ui/types/card-variant'
import { type FunctionComponent } from 'react'

interface Props {
  variant?: CardVariant
}

export const NftCardSkeleton: FunctionComponent<Props> = ({ variant }) => {
  return <CardSkeleton variant={variant} />
}
