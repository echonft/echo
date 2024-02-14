import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  blur?: boolean
}
export const CollectionRowLabel: FunctionComponent<PropsWithChildren<Props>> = ({ blur, children }) => {
  return <span className={classes('prose-header-md-semi', 'text-white', 'h-max', blur && 'blur-md')}>{children}</span>
}
