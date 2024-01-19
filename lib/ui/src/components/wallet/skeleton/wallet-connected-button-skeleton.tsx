'use client'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const WalletConnectedButtonSkeleton: FunctionComponent = () => {
  return <div className={clsx('bg-white/[0.08]', 'h-[1.875rem]', 'w-[8.75rem]', 'animate-pulse')} />
}
