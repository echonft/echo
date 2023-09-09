import { isNilOrEmpty, NonEmptyArray } from '@echo/utils'
import { ReactNode } from 'react'

interface Props<T> {
  checks: T[]
  render: (checks: NonNullable<NonEmptyArray<T>>) => ReactNode
}

export function HideIfNilOrEmpty<T>({ checks, render }: Props<T>) {
  if (isNilOrEmpty(checks)) {
    return null as ReactNode
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return render(checks)
}
