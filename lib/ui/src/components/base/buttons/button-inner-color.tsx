import { ButtonVariant } from './button-variant'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface ButtonInnerColorProps {
  variant: ButtonVariant
}

export const ButtonInnerColor: FunctionComponent<PropsWithChildren<ButtonInnerColorProps>> = ({
  variant,
  children
}) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'flex-1',
        variant === ButtonVariant.PRIMARY && [
          'text-white',
          'group-hover:text-black',
          'group-active:text-black',
          'group-disabled:text-white/50',
          'group-disabled:group-hover:text-white/50'
        ],
        variant === ButtonVariant.SECONDARY && [
          'text-dark-500',
          'group-hover:text-yellow-100',
          'group-disabled:text-dark-500',
          'group-disabled:group-hover:text-dark-500'
        ],
        variant === ButtonVariant.ACTION && ['text-purple-900']
      )}
    >
      {children}
    </div>
  )
}
