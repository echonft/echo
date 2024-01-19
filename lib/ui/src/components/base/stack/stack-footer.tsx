import { CardSubtitle } from '@echo/ui/components/base/card/card-subtitle'
import { CardTitle } from '@echo/ui/components/base/card/card-title'
import { StackFooterLayout } from '@echo/ui/components/base/stack/layout/stack-footer-layout'
import { type FunctionComponent } from 'react'

interface Props {
  title: string
  subtitle: string
}

export const StackFooter: FunctionComponent<Props> = ({ title, subtitle }) => {
  return (
    <StackFooterLayout>
      <CardTitle label={title} />
      <CardSubtitle label={subtitle} />
    </StackFooterLayout>
  )
}
