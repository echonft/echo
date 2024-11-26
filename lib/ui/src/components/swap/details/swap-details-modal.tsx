'use client'
import type { Swap } from '@echo/model/types/swap'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { SwapDetailsModalBody } from '@echo/ui/components/swap/details/swap-details-modal-body'
import { Background } from '@echo/ui/constants/background'
import { useBackground } from '@echo/ui/hooks/use-background'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  swap: Nullable<Swap>
  onClose?: VoidFunction
}

export const SwapDetailsModal: FunctionComponent<Props> = ({ swap, onClose }) => {
  const { className } = useBackground(Background.GreenGradient)
  return (
    <Modal open={!isNil(swap)} onClose={onClose} className={className}>
      <SwapDetailsModalBody swap={swap} />
    </Modal>
  )
}
