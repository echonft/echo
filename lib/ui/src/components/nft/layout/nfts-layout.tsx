import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  centered?: boolean
}
export const NftsLayout: FunctionComponent<PropsWithChildren<Props>> = ({ centered, children }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'grow', 'flex-wrap', 'gap-6', 'h-max', centered && 'justify-center')}>
      {children}
    </div>
  )
}
