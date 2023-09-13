import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const NftsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'grow', 'flex-wrap', 'gap-6', 'h-max')}>{children}</div>
}
