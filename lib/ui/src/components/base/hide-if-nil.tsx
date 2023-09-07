import { isNil } from 'ramda'
import { ReactNode } from 'react'

interface Props<T> {
  checks: T
  render: (checks: NonNullable<T>) => ReactNode
}

export function HideIfNil<T>({ checks, render }: Props<T>) {
  if (isNil(checks)) {
    return null as ReactNode
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return render(checks)
}
