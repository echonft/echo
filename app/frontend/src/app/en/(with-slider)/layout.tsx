'use client'
import { NewOfferSliderManager } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import type { FunctionComponent, PropsWithChildren } from 'react'

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      {/*  TODO Add routing when add more is pressed. (Add more for receiver leads to receiver page, otherwise sender page */}
      <NewOfferSliderManager />
    </>
  )
}

export default Layout
