import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export const IconContainerColor: FunctionComponent<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div
      className={classes(
        'w-full',
        'h-full',
        'flex',
        'flex-row',
        'justify-center',
        'items-center',
        'text-yellow-700',
        'bg-white/[0.08]',
        className
      )}
    >
      {children}
    </div>
  )
}
