import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const SelectableNftsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div layout className={clsx('flex', 'flex-row', 'grow', 'flex-wrap', 'gap-5', 'h-max')}>
      {children}
    </motion.div>
  )
}
