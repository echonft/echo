'use client'
import {
  TraitFilterPanel,
  type TraitFilterPanelProps
} from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { motion } from 'framer-motion'
import { type FunctionComponent } from 'react'

interface Props extends TraitFilterPanelProps {
  show: boolean
}

export const TraitFilterPanelVisibilityManager: FunctionComponent<Props> = ({
  show,
  nfts,
  selection,
  onToggleSelection
}) => {
  if (show) {
    return (
      <motion.div
        transition={{ ease: 'easeOut', duration: 0.4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TraitFilterPanel nfts={nfts} selection={selection} onToggleSelection={onToggleSelection} />
      </motion.div>
    )
  }
  return null
}
