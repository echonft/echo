import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const SelectableNftCardsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div layout className={clsx('flex', 'flex-row', 'flex-wrap', 'gap-5', 'h-max')}>
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </motion.div>
  )
}
