import { type FunctionComponent, type PropsWithChildren } from 'react'

export const NavigationLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={'navigation-page-layout'}>{children}</div>
}
