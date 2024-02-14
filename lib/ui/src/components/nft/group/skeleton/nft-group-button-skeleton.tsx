import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const NftGroupButtonSkeleton: FunctionComponent = () => {
  return (
    <div
      className={classes('rounded-lg', 'bg-white/[0.08]', 'h-[1.0625rem]', 'w-[9.5rem]', 'mt-2.5', 'ml-2.5', 'mb-2.5')}
    />
  )
}
