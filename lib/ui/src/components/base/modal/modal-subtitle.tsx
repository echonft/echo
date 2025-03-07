import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const ModalSubtitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <span className={clsx('prose-label-lg', 'text-white/50')}>{children}</span>
)
