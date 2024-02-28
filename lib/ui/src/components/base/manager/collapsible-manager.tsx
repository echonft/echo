'use client'
import { type WithCollapsibleProps } from '@echo/ui/types/props/with-collapsible-props'
import { cloneElement, type ReactElement, useState } from 'react'

interface Props<T extends WithCollapsibleProps> {
  initialCollapsedState?: boolean
  children: ReactElement<T>
}

export const CollapsibleManager = <T extends WithCollapsibleProps>({ initialCollapsedState, children }: Props<T>) => {
  const [collapsed, setCollapsed] = useState(initialCollapsedState ?? false)
  return cloneElement<T>(children, {
    ...children.props,
    collapsed,
    onToggleCollapsed: (collapsed) => {
      setCollapsed(collapsed)
    }
  })
}
