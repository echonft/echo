'use client'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const SelectableNftCardButtonLayout: FunctionComponent<WithChildrenProps> = ({ children }) => {
  return <div className={clsx('w-full', 'h-max', 'rounded-b-2xl')}>{children}</div>
}
