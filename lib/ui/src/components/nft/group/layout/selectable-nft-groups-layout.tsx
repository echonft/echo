'use client'
import { SelectableNftGroupsCollapsibleLayout } from '@echo/ui/components/nft/group/layout/selectable-nft-groups-collapsible-layout'
import { SelectableNftGroupsNotCollapsibleLayout } from '@echo/ui/components/nft/group/layout/selectable-nft-groups-not-collapsible-layout'
import { AnimatePresence } from 'framer-motion'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  style?: {
    collapsible?: boolean
  }
}
export const SelectableNftGroupsLayout: FunctionComponent<PropsWithChildren<Props>> = ({ style, children }) => {
  if (style?.collapsible) {
    return (
      <SelectableNftGroupsCollapsibleLayout>
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      </SelectableNftGroupsCollapsibleLayout>
    )
  }
  return <SelectableNftGroupsNotCollapsibleLayout>{children}</SelectableNftGroupsNotCollapsibleLayout>
}
