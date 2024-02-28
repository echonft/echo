import { classes } from '@echo/ui/helpers/classes'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props extends WithLoadingProps {
  title: string
}

export const NftFiltersPanelLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, loading, children }) => {
  return (
    <div
      className={classes(
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
      <h2 className={classes('prose-label-sm-semi', 'text-white/50', 'py-1', loading && 'invisible')}>{title}</h2>
      {children}
    </div>
  )
}
