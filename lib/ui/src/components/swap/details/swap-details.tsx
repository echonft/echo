'use client'
import type { Swap } from '@echo/model/types/swap'
import type { FunctionComponent } from 'react'

export interface SwapDetailsProps {
  swap: Swap
  onUpdate?: (swap: Swap) => unknown
}

export const SwapDetails: FunctionComponent<SwapDetailsProps> = () => {
  // TODO
  return null
}
