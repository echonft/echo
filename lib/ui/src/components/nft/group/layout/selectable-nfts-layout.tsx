import { classes } from '@echo/ui/helpers/classes'
import { motion } from 'framer-motion'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const SelectableNftsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div layout className={classes('flex', 'flex-row', 'grow', 'flex-wrap', 'gap-5', 'h-max')}>
      {children}
    </motion.div>
  )
}
