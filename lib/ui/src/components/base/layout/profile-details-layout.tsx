import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ProfileDetailsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('flex', 'flex-row', 'w-full', 'gap-8')}>{children}</div>
}
