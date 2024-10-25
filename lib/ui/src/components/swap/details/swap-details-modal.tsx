'use client'
import type { Swap } from '@echo/model/types/swap'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { SwapDetailsModalBody } from '@echo/ui/components/swap/details/swap-details-modal-body'
import { Background } from '@echo/ui/constants/background'
import { useBackground } from '@echo/ui/hooks/use-background'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export interface SwapDetailsModalProps {
  swap: Nullable<Swap>
  onClose?: EmptyFunction
  onUpdate?: (swap: Swap) => unknown
}

export const SwapDetailsModal: FunctionComponent<SwapDetailsModalProps> = ({ swap, onClose, onUpdate }) => {
  const { className } = useBackground(Background.GreenGradient)
  return (
    <Modal open={!isNil(swap)} onClose={onClose} className={className} backButton={{ onBack: onClose }}>
      <SwapDetailsModalBody swap={swap} onUpdate={onUpdate} />
    </Modal>
  )
}
