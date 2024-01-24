import { BackButton } from '@echo/ui/components/base/back-button'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export interface ModalBackButtonProps {
  label?: string
  onBack?: VoidFunction
}

export const ModalBackButton: FunctionComponent<ModalBackButtonProps> = ({ label, onBack }) => {
  if (isNil(label)) {
    return null
  }
  return <BackButton onBack={onBack} title={label} />
}
