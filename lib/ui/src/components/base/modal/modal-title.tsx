import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { DialogTitle } from '@headlessui/react'
import { clsx } from 'clsx'
import { Fragment, type FunctionComponent } from 'react'

export interface ModalTitleProps {
  title?: string
}

export const ModalTitle: FunctionComponent<ModalTitleProps> = ({ title }) => {
  if (isNilOrEmpty(title)) {
    return null
  }
  return (
    <DialogTitle as={Fragment}>
      <span className={clsx('text-white', 'text-center', 'prose-header-sm-semi', 'pb-5', 'select-none')}>{title}</span>
    </DialogTitle>
  )
}
