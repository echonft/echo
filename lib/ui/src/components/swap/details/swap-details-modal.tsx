'use client'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { SwapDetailsModalBody } from '@echo/ui/components/swap/details/swap-details-modal-body'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  swap: Nullable<SwapWithRole>
  onClose?: VoidFunction
}

export const SwapDetailsModal: FunctionComponent<Props> = ({ swap, onClose }) => {
  return (
    <Modal open={!isNil(swap)} onClose={onClose}>
      <SwapDetailsModalBody swap={swap} onClose={onClose} />
    </Modal>
  )
}
