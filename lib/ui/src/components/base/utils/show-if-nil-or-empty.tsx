import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

interface Props {
  checks: unknown
  render?: () => ReactNode
}

export const ShowIfNilOrEmpty: FunctionComponent<PropsWithChildren<Props>> = ({ checks, render, children }) => (
  <ShowIf condition={isNilOrEmpty(checks)} render={render}>
    {children}
  </ShowIf>
)
