import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { NonEmptyObject } from '@echo/utils/types/non-empty-object'
import { NonEmptyString } from '@echo/utils/types/non-empty-string'
import { is } from 'ramda'
import type { ReactNode } from 'react'

interface ArrayProps<T> {
  checks: T[]
  render: (checks: NonEmptyArray<T>) => ReactNode
}

interface StringProps {
  checks: string
  render: <T extends string>(checks: NonEmptyString<T>) => ReactNode
}

interface ObjectProps {
  checks: object
  render: <T extends Record<string | number | symbol, unknown>>(checks: NonEmptyObject<T>) => ReactNode
}

function HideIfEmptyArray<T>({ checks, render }: ArrayProps<T>) {
  if (isNilOrEmpty(checks)) {
    return null as ReactNode
  }
  return render(checks as NonEmptyArray<T>)
}

function HideIfEmptyString<T extends string>({ checks, render }: StringProps) {
  if (isNilOrEmpty(checks)) {
    return null as ReactNode
  }
  return render(checks as NonEmptyString<T>)
}

function HideIfEmptyObject<T extends Record<string | number | symbol, unknown>>({ checks, render }: ObjectProps) {
  if (isNilOrEmpty(checks)) {
    return null as ReactNode
  }
  return render(checks as NonEmptyObject<T>)
}

export function HideIfEmpty<T>(props: ArrayProps<T>): ReactNode
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HideIfEmpty<T extends string>(props: StringProps): ReactNode
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HideIfEmpty<T extends Record<string | number | symbol, unknown>>(props: ObjectProps): ReactNode
export function HideIfEmpty<T = unknown>(props: ArrayProps<T> | StringProps | ObjectProps): ReactNode {
  const { checks, render } = props
  if (is(Array, checks)) {
    return HideIfEmptyArray<T>({
      checks: checks as T[],
      render: render as (checks: NonNullable<NonEmptyArray<T>>) => ReactNode
    })
  }
  if (is(String, checks)) {
    return HideIfEmptyString({
      checks,
      render: render as <T extends string>(checks: NonNullable<NonEmptyString<T>>) => ReactNode
    })
  }
  return HideIfEmptyObject({
    checks,
    render: render as <T extends Record<string | number | symbol, unknown>>(
      checks: NonNullable<NonEmptyObject<T>>
    ) => ReactNode
  })
}
