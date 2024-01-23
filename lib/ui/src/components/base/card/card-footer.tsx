import { CardSubtitle } from '@echo/ui/components/base/card/card-subtitle'
import { CardTitle } from '@echo/ui/components/base/card/card-title'
import { CardFooterLayout } from '@echo/ui/components/base/card/layout/card-footer-layout'
import type { CardVariant } from '@echo/ui/types/card-variant'
import { type FunctionComponent } from 'react'

interface Props {
  title: string
  subtitle: string
  variant?: CardVariant
}

export const CardFooter: FunctionComponent<Props> = ({ title, subtitle, variant }) => {
  return (
    <CardFooterLayout variant={variant}>
      <CardTitle label={title} />
      <CardSubtitle label={subtitle} />
    </CardFooterLayout>
  )
}
