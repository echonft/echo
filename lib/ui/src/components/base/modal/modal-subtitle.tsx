import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const ModalSubtitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <span className={classes('prose-label-lg', 'text-white/50')}>{children}</span>
)
