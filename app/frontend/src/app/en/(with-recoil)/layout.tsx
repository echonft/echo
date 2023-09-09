'use client'
import { NewOfferSliderManager } from '@echo/ui'
import { FunctionComponent, PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <RecoilRoot>
      {children}
      {/*  TODO Add routing when add more is pressed. (Add more for receiver leads to receiver page, otherwise sender page */}
      <NewOfferSliderManager />
    </RecoilRoot>
  )
}

export default Layout
