'use client'
import { DetailsModalBodyLayout } from '@echo/ui/components/base/layout/details-modal-body-layout'
import { SwapDetails } from '@echo/ui/components/swap/details/swap-details'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  swap: Nullable<SwapWithRole>
  onClose?: VoidFunction
}

export const SwapDetailsModalBody: FunctionComponent<Props> = ({ swap, onClose }) => {
  if (isNil(swap)) {
    return null
  }
  return (
    <DetailsModalBodyLayout>
      <SwapDetails swap={swap} onClose={onClose} />
    </DetailsModalBodyLayout>
  )
}
