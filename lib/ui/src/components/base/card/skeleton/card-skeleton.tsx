import { CardSubtitle } from '@echo/ui/components/base/card/card-subtitle'
import { CardTitle } from '@echo/ui/components/base/card/card-title'
import { CardFooterLayout } from '@echo/ui/components/base/card/layout/card-footer-layout'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { type FunctionComponent } from 'react'

export const CardSkeleton: FunctionComponent = () => {
  return (
    <CardLayout loading={true}>
      <CardPictureLayout loading={true} />
      <CardFooterLayout loading={true}>
        <CardTitle label={'Placeholder'} />
        <CardSubtitle label={'#0000'} />
      </CardFooterLayout>
    </CardLayout>
  )
}
