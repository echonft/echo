import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const RankedCollectionRowRankPictureLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'gap-7.5', 'items-center', 'h-max')}>{children}</div>
}
