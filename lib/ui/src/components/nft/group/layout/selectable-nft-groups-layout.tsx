'use client'
import { SelectableNftsLayout } from '@echo/ui/components/nft/group/layout/selectable-nfts-layout'
import type { SelectableNftsContainerProps } from '@echo/ui/components/nft/selectable/selectable-nfts-container'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SelectableNftGroupsLayout: FunctionComponent<
  PropsWithChildren<Pick<SelectableNftsContainerProps, 'style'>>
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
