import clsx from 'clsx'
import { FunctionComponent } from 'react'

export interface ModalTitleProps {
  title: string
}

export const ModalTitle: FunctionComponent<ModalTitleProps> = ({ title }) => (
  <span className={clsx('text-white', 'text-center', 'prose-header-sm-semi')}>{title}</span>
)
