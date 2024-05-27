import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const ModalDescription: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <span className={clsx('text-white/70', 'prose-other-light', 'italic', 'w-max', 'whitespace-pre-line', 'text-center')}>
    {children}
  </span>
)
