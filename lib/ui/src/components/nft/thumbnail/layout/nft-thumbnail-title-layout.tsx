import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const NftThumbnailTitleLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('w-full', 'min-w-0', 'h-max', 'rounded-b-lg', 'px-1.5', 'pt-1.25', 'pb-2.25')}>{children}</div>
  )
}
