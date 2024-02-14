'use client'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const WalletConnectedButtonSkeleton: FunctionComponent = () => {
  return <div className={classes('bg-white/[0.08]', 'h-[1.875rem]', 'w-[8.75rem]', 'rounded-lg', 'animate-pulse')} />
}
