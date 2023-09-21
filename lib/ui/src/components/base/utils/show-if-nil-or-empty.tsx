import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  checks: unknown
}

export const ShowIfNilOrEmpty: FunctionComponent<PropsWithChildren<Props>> = ({ checks, children }) => (
  <ShowIf condition={isNilOrEmpty(checks)}>{children}</ShowIf>
)
