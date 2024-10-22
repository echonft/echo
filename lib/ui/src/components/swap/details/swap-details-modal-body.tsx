'use client'
import { SwapDetails } from '@echo/ui/components/swap/details/swap-details'
import type { SwapDetailsModalProps } from '@echo/ui/components/swap/details/swap-details-modal'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export const SwapDetailsModalBody: FunctionComponent<Omit<SwapDetailsModalProps, 'onClose'>> = ({ swap, onUpdate }) => {
  if (isNil(swap)) {
    return null
  }
  return (
    <div className={clsx('w-[66vw]', 'h-max', 'max-w-[70rem]', 'p-4', 'px-8')}>
      <SwapDetails swap={swap} onUpdate={onUpdate} />
    </div>
  )
}
