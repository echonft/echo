import { CardSubtitle } from '@echo/ui/components/base/card/card-subtitle'
import { CardTitle } from '@echo/ui/components/base/card/card-title'
import { CardFooterLayout } from '@echo/ui/components/base/card/layout/card-footer-layout'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import type { CardVariant } from '@echo/ui/types/card-variant'
import { type FunctionComponent } from 'react'

interface Props {
  variant?: CardVariant
}

// TODO Probably the skeleton card could be better. It could maybe include a separation for the image
// and a loading user tag and state tag.
export const CardSkeleton: FunctionComponent<Props> = ({ variant }) => {
  return (
    <CardLayout loading={true}>
      <CardPictureLayout loading={true} />
      <CardFooterLayout variant={variant} loading={true}>
        <CardTitle label={'Placeholder'} />
        <CardSubtitle label={'#0000'} />
      </CardFooterLayout>
    </CardLayout>
  )
}
