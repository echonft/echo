import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  title: string
  className?: string
}

export const FiltersPanelLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, className, children }) => {
  return (
    <div
      className={clsx('flex', 'flex-col', 'p-2', 'rounded-2xl', 'bg-white/[0.09]', 'w-52', 'h-max', 'gap-2', className)}
    >
      <h2 className={clsx('prose-label-sm-semi', 'text-white/50', 'py-1')}>{title}</h2>
      {children}
    </div>
  )
}
