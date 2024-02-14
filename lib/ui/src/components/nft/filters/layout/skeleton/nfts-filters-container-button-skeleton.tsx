import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const NftsFiltersContainerButtonSkeleton: FunctionComponent = () => {
  return <button className={classes('btn-gradient', 'w-full', 'p-2.5', 'h-[2.875rem]', 'animate-pulse')} disabled />
}
