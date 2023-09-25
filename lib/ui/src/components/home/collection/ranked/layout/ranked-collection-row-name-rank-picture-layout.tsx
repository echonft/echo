import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const RankedCollectionRowNameRankPictureLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'gap-12', 'items-center', 'h-max')}>{children}</div>
}
