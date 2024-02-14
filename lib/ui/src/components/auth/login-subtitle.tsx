import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const LoginSubtitle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <span className={classes('prose-header-md-semi', 'text-white', 'text-center', 'whitespace-pre-line')}>
      {children}
    </span>
  )
}
