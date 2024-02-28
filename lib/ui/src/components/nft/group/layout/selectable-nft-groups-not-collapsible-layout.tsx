'use client'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SelectableNftGroupsNotCollapsibleLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <CardsLayout>{children}</CardsLayout>
}
