'use client'
import { classes } from '@echo/ui/helpers/classes'
import { LayoutGroup, motion } from 'framer-motion'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SelectableNftGroupsCollapsibleLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutGroup>
      <motion.div layout className={classes('flex', 'flex-col', 'grow', 'gap-12', 'h-max')}>
        {children}
      </motion.div>
    </LayoutGroup>
  )
}
