'use client'
import { NewOfferSliderManager } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import type { FunctionComponent, PropsWithChildren } from 'react'

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <NewOfferSliderManager />
    </>
  )
}

export default Layout
