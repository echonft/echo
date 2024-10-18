import { CardSubtitle } from '@echo/ui/components/base/card/card-subtitle'
import { CardTitle } from '@echo/ui/components/base/card/card-title'
import { CardFooterLayout } from '@echo/ui/components/base/card/layout/card-footer-layout'
import { type FunctionComponent } from 'react'

interface Props {
  title: string
  subtitle: string
}

export const CardFooter: FunctionComponent<Props> = ({ title, subtitle }) => {
  return (
    <CardFooterLayout>
      <CardTitle label={title} />
      <CardSubtitle label={subtitle} />
    </CardFooterLayout>
  )
}
