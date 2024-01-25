import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const BannerAbsoluteTopLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('absolute', 'top-0', 'inset-x-0')}>{children}</div>
)
