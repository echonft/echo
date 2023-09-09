import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const NftsAndFiltersLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'grow', 'gap-8')}>{children}</div>
}
