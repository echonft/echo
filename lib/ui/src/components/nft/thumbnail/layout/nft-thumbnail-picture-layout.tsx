import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const NftThumbnailPictureLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('rounded-lg', 'select-none', 'w-32', 'h-32', 'relative')}>{children}</div>
}
