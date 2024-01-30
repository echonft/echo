import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  title: string
}

export const NftFiltersPanelLayoutSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'p-2',
        'rounded-2xl',
        'bg-white/[0.09]',
        'w-52',
        'h-[15rem]',
        'gap-2',
        'animate-pulse'
      )}
    >
      <h2 className={clsx('prose-label-sm-semi', 'text-white/50', 'py-1', 'opacity-40')}>{title}</h2>
      {children}
    </div>
  )
}
