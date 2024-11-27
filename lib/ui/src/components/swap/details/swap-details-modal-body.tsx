'use client'
import type { Swap } from '@echo/model/types/swap'
import { SwapDetails } from '@echo/ui/components/swap/details/swap-details'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  swap: Nullable<Swap>
  onClose?: EmptyFunction
}

export const SwapDetailsModalBody: FunctionComponent<Props> = ({ swap, onClose }) => {
  if (isNil(swap)) {
    return null
  }
  return (
    <div className={clsx('w-[66vw]', 'h-max', 'max-w-[70rem]', 'p-4', 'px-8')}>
      <SwapDetails swap={swap} onClose={onClose} />
    </div>
  )
}
