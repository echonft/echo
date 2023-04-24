import { ButtonVariant } from './button-variant'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface ButtonContainerColorProps {
  variant: ButtonVariant
}

export const ButtonContainerColor: FunctionComponent<PropsWithChildren<ButtonContainerColorProps>> = ({
  variant,
  children
}) => {
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        'border-none',
        variant === ButtonVariant.PRIMARY && [
          'bg-white/[0.08]',
          'group-hover:bg-yellow-500',
          'group-active:bg-yellow-700',
          'group-disabled:bg-white/[0.08]',
          'group-disabled:group-hover:bg-white/[0.08]'
        ],
        variant === ButtonVariant.SECONDARY && [
          'bg-main-gradient',
          'group-hover:main-gradient-40-percent',
          'group-hover:border-solid',
          'group-hover:border-yellow-500',
          'group-active:bg-yellow-700',
          'group-disabled:main-gradient-40-percent',
          'group-disabled:group-hover:main-gradient-40-percent',
          'group-disabled:group-hover:border-none'
        ],
        variant === ButtonVariant.ACTION && ['bg-purple-300']
      )}
    >
      {children}
    </div>
  )
}
