import isNilOrEmpty from '@echo/utils/is-nil-or-empty'
import type { NonEmptyArray } from '@echo/utils/types'
import type { ReactNode } from 'react'

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
