import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const NftSelectionButtonSkeleton: FunctionComponent = () => {
  return <button disabled={true} className={classes('btn-gradient', 'w-full', 'h-[2.875rem]', 'animate-pulse')} />
}
