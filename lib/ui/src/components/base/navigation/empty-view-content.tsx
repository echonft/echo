import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  message: string
}

export const EmptyViewContent: FunctionComponent<PropsWithChildren<Props>> = ({ message, children }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'grow', 'h-96', 'justify-center', 'items-center')}>
      <div className={clsx('flex', 'flex-col', 'w-max', 'h-max', 'items-center', 'gap-12')}>
        <span className={clsx('text-white', 'prose-header-md-semi')}>{message}</span>
        {children}
      </div>
    </div>
  )
}
