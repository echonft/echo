import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const UserDiscordTagSkeleton: FunctionComponent = () => {
  return <div className={classes('h-[2.625rem]', 'w-[12rem]', 'rounded-lg', 'bg-purple-500', 'animate-pulse')} />
}
