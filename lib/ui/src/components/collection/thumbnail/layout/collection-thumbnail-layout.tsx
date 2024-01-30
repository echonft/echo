import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

interface Props extends WithLoadingProps {
  disabled?: boolean
  onClick?: MouseEventHandler
}
export const CollectionThumbnailLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  loading,
  disabled,
  onClick,
  children
}) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'pt-3.5',
        'pb-3.75',
        'px-3.25',
        'gap-3.5',
        'items-center',
        'w-96',
        'rounded-lg',
        'border',
        'border-white/10',
        'bg-dark-500',
        !disabled && !isNil(onClick) && ['hover:bg-white/[0.08]', 'cursor-pointer'],
        loading ? ['h-[8.125rem]', 'animate-pulse'] : 'h-max',
        disabled && 'opacity-40'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
