'use client'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const SelectableNftCardButtonLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('w-full', 'h-max', 'rounded-b-2xl')}>{children}</div>
}
