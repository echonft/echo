import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export const CollectionThumbnailLayout: FunctionComponent<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={clsx('rounded-2xl', 'w-52', 'h-max', 'overflow-clip', className)}>{children}</div>
}
