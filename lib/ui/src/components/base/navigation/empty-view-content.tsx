import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  message: string
}

export const EmptyViewContent: FunctionComponent<PropsWithChildren<Props>> = ({ message, children }) => {
  return (
    <div className={classes('flex', 'flex-row', 'grow', 'h-96', 'justify-center', 'items-center')}>
      <div className={classes('flex', 'flex-col', 'w-max', 'h-max', 'items-center', 'gap-12')}>
        <span className={classes('text-white', 'prose-header-md-semi')}>{message}</span>
        {children}
      </div>
    </div>
  )
}
