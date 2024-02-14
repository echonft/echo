'use client'
import { classes } from '@echo/ui/helpers/classes'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { FunctionComponent } from 'react'

interface Props extends WithChildrenProps {}

export const SelectableNftCardButtonLayout: FunctionComponent<Props> = ({ children }) => {
  return <div className={classes('w-full', 'h-max', 'rounded-b-2xl')}>{children}</div>
}
