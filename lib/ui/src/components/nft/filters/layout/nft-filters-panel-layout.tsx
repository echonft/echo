import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  title: string
}

export const NftFiltersPanelLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <div className={classes('flex', 'flex-col', 'p-2', 'rounded-2xl', 'bg-white/[0.09]', 'w-52', 'h-max', 'gap-2')}>
      <h2 className={classes('prose-label-sm-semi', 'text-white/50', 'py-1')}>{title}</h2>
      {children}
    </div>
  )
}
