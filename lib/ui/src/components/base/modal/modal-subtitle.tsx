import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface ModalSubtitleProps {
  subtitle: string
}

export const ModalSubtitle: FunctionComponent<ModalSubtitleProps> = ({ subtitle }) => (
  <span className={clsx('prose-label-lg', 'text-white/50')}>{subtitle}</span>
)
