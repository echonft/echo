import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ModalTitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <span className={clsx('text-white', 'text-center', 'prose-header-sm-semi')}>{children}</span>
)
