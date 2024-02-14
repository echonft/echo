import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent } from 'react'

export const NavigationPillSkeleton: FunctionComponent = () => {
  return (
    <button className={classes('pill', 'animate-pulse')} disabled={true}>
      <span className={classes('prose-label-md', 'text-white', 'select-none', 'invisible')}>{'Items'}</span>
    </button>
  )
}
