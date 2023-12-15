'use client'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends WithChildrenProps {}

export const SelectableNftCardButtonLayout: FunctionComponent<Props> = ({ children }) => {
  return <div className={clsx('w-full', 'h-max', 'rounded-b-2xl')}>{children}</div>
}
