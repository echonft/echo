'use client'
import { classes } from '@echo/ui/helpers/classes'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SelectableNftGroupsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutGroup>
      <motion.div layout className={classes('flex', 'flex-col', 'grow', 'gap-12', 'h-max')}>
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      </motion.div>
    </LayoutGroup>
  )
}
