import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftDetailsTokenDetailsPanelRowProps {
  name: string
  value: string
}

export const NftDetailsTokenDetailsPanelRow: FunctionComponent<NftDetailsTokenDetailsPanelRowProps> = ({
  name,
  value
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'justify-between', 'prose-header-xs-semi')}>
      <span className={clsx('text-white/[0.55]')}>{name}</span>
      <span className={clsx('text-white')}>{value}</span>
    </div>
  )
}
