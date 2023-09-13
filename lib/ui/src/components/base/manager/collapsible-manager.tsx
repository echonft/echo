'use client'
import type { CollapsibleProps } from '@echo/ui/types/collapsible-props'
import { cloneElement, type ReactElement, useState } from 'react'

interface Props<T extends CollapsibleProps> {
  initialCollapsedState?: boolean
  children: ReactElement<T>
}

export const CollapsibleManager = <T extends CollapsibleProps>({ initialCollapsedState, children }: Props<T>) => {
  const [collapsed, setCollapsed] = useState(initialCollapsedState ?? false)
  return cloneElement<T>(children, {
    ...children.props,
    collapsed,
    onToggleCollapsed: (collapsed) => {
      setCollapsed(collapsed)
    }
  })
}
