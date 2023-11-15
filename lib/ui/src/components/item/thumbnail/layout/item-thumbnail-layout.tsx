import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export const ItemThumbnailLayout: FunctionComponent<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={clsx('rounded-lg', 'w-32', 'h-max', 'overflow-clip', className)}>{children}</div>
}
