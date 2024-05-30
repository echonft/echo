'use client'
import {
  TraitFilterPanel,
  type TraitFilterPanelProps
} from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { motion } from 'framer-motion'
import { type FunctionComponent, useEffect, useRef } from 'react'

interface Props extends TraitFilterPanelProps {
  show: boolean
}

export const TraitFilterPanelVisibilityManager: FunctionComponent<Props> = ({
  show,
  nfts,
  selection,
  onToggleSelection
}) => {
  // we need to keep a reference to previous filters so that they don't get updated during the exit animation
  const filtersRef = useRef(nfts)
  useEffect(() => {
    if (show) {
      filtersRef.current = nfts
    }
  }, [show, nfts])

  if (show) {
    return (
      <motion.div
        transition={{ ease: 'easeOut', duration: 0.4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TraitFilterPanel
          nfts={show ? nfts : filtersRef.current}
          selection={selection}
          onToggleSelection={onToggleSelection}
        />
      </motion.div>
    )
  }
  return null
}
