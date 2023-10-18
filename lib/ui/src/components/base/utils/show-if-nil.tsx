import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  checks: unknown
}

export const ShowIfNil: FunctionComponent<PropsWithChildren<Props>> = ({ checks, children }) => {
  return <ShowIf condition={isNil(checks)}>{children}</ShowIf>
}
