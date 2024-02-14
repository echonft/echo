import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SectionLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <section className={classes('w-full', 'relative')}>{children}</section>
}
