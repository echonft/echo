'use client'
import { clsx } from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SelectableNftGroupsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutGroup>
      <motion.div layout className={clsx('flex', 'flex-col', 'grow', 'gap-12', 'h-max')}>
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      </motion.div>
    </LayoutGroup>
  )
}
