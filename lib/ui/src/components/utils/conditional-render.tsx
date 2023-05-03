import { FunctionComponent, PropsWithChildren } from 'react'

export interface ConditionalRenderProps {
  hideIf: boolean
}

export const ConditionalRender: FunctionComponent<PropsWithChildren<ConditionalRenderProps>> = ({
  hideIf,
  children
}) => {
  if (hideIf) {
    return null
  }
  return <>{children}</>
}
