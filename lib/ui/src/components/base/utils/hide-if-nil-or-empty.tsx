import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { type NonEmptyObject } from '@echo/utils/types/non-empty-object'
import { type NonEmptyString } from '@echo/utils/types/non-empty-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { is } from 'ramda'
import { type ReactNode } from 'react'

interface ArrayProps<T> {
  checks: T[] | undefined
  render: (checks: NonNullable<NonEmptyArray<T>>) => ReactNode
}

interface StringProps {
  checks: Nullable<string>
  render: <T extends string>(checks: NonNullable<NonEmptyString<T>>) => ReactNode
}

interface ObjectProps {
  checks: Nullable<object>
  render: <T extends Record<PropertyKey, unknown>>(checks: NonNullable<NonEmptyObject<T>>) => ReactNode
}

function HideIfNilOrEmptyArray<T>({ checks, render }: ArrayProps<T>) {
  if (isNilOrEmpty(checks)) {
    return null as ReactNode
  }
  return render(checks as NonNullable<NonEmptyArray<T>>)
}

function HideIfNilOrEmptyString<T extends string>({ checks, render }: StringProps) {
  if (isNilOrEmpty(checks)) {
    return null as ReactNode
  }
  return render(checks as NonNullable<NonEmptyString<T>>)
}

function HideIfNilOrEmptyObject<T extends Record<PropertyKey, unknown>>({ checks, render }: ObjectProps) {
  if (isNilOrEmpty(checks)) {
    return null as ReactNode
  }
  return render(checks as NonNullable<NonEmptyObject<T>>)
}

export function HideIfNilOrEmpty<T>(props: ArrayProps<T>): ReactNode
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HideIfNilOrEmpty<T extends string>(props: StringProps): ReactNode
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HideIfNilOrEmpty<T extends Record<PropertyKey, unknown>>(props: ObjectProps): ReactNode
export function HideIfNilOrEmpty<T = unknown>(props: ArrayProps<T> | StringProps | ObjectProps): ReactNode {
  const { checks, render } = props
  if (is(Array, checks)) {
    return HideIfNilOrEmptyArray<T>({
      checks: checks as T[] | undefined,
      render: render as (checks: NonNullable<NonEmptyArray<T>>) => ReactNode
    })
  }
  if (is(String, checks)) {
    return HideIfNilOrEmptyString({
      checks,
      render: render as <T extends string>(checks: NonNullable<NonEmptyString<T>>) => ReactNode
    })
  }
  return HideIfNilOrEmptyObject({
    checks,
    render: render as <T extends Record<PropertyKey, unknown>>(checks: NonNullable<NonEmptyObject<T>>) => ReactNode
  })
}
