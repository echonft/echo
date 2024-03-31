'use client'
import { SelectableNftsLayout } from '@echo/ui/components/nft/group/layout/selectable-nfts-layout'
import type { SelectableNftGroupsProps } from '@echo/ui/components/nft/group/selectable-nft-groups'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SelectableNftGroupsLayout: FunctionComponent<
  PropsWithChildren<Pick<SelectableNftGroupsProps, 'style'>>
> = ({ style, children }) => {
  if (style?.collapsible) {
    return (
      <motion.div layout className={clsx('flex', 'flex-col', 'gap-12', 'h-max', 'w-full')}>
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      </motion.div>
    )
  }
  return <SelectableNftsLayout>{children}</SelectableNftsLayout>
}
