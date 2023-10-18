import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  condition: boolean
}

export const ShowIf: FunctionComponent<PropsWithChildren<Props>> = ({ condition, children }) => {
  if (condition) {
    return <>{children}</>
  }
  return null
}
