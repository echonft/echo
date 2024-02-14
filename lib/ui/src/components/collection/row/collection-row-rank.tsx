import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CollectionRowRank: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <span className={classes('prose-header-md-semi', 'text-white', 'h-max', 'w-12', 'text-center')}>{children}</span>
  )
}
