import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const HeaderButtonSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('btn-primary')}>
      <span className={clsx('btn-label-primary', 'w-[8.75rem]')} />
    </div>
  )
}
