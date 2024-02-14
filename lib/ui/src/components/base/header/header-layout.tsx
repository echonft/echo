import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HeaderLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <header
      className={classes('bg-transparent', 'border-b-2', 'border-solid', 'border-white/[0.08]', 'w-full', 'h-max')}
    >
      {children}
    </header>
  )
}
