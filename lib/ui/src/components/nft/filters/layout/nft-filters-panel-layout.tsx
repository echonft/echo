import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props extends WithLoadingProps {
  title: string
}

export const NftFiltersPanelLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, loading, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'p-2',
        'rounded-2xl',
        'bg-white/[0.09]',
        'w-52',
        'gap-2',
        loading ? ['h-[30rem]', 'animate-pulse'] : 'h-max'
      )}
    >
      <h2 className={clsx('prose-label-sm-semi', 'text-white/50', 'py-1', loading && 'invisible')}>{title}</h2>
      {children}
    </div>
  )
}
