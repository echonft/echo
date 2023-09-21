import { isNil } from 'ramda'
import type { ReactNode } from 'react'

interface Props<T> {
  checks: T
  render: (checks: NonNullable<T>) => ReactNode
}

export function HideIfNil<T>({ checks, render }: Props<T>) {
  if (isNil(checks)) {
    return null as ReactNode
  }
  return render(checks as NonNullable<T>)
}
