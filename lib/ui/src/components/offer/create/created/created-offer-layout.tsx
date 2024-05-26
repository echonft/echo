import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CreatedOfferLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('flex', 'flex-col', 'pt-56', 'w-full', 'items-center', 'gap-7')}>{children}</div>
)
