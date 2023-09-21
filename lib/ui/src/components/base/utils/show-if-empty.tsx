import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { isEmpty } from 'ramda'
import type { PropsWithChildren } from 'react'

interface Props<T> {
  checks: Array<T> | string | object
}

export function ShowIfEmpty<T>({ checks, children }: PropsWithChildren<Props<T>>) {
  return <ShowIf condition={isEmpty(checks)}>{children}</ShowIf>
}
