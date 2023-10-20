import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const UserPictureAndInfoLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-40', 'gap-8', 'items-end', 'relative', 'z-10')}
    >
      {children}
    </div>
  )
}
