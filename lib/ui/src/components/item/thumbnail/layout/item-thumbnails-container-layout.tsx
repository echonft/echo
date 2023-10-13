import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  centered?: boolean
}

export const ItemThumbnailsContainerLayout: FunctionComponent<PropsWithChildren<Props>> = ({ centered, children }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4', 'grow', 'h-max', centered && 'justify-center')}>{children}</div>
  )
}
