import { ButtonColorScheme } from './button-color-scheme'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface ButtonContainerColorProps {
  colorScheme: ButtonColorScheme
}

export const ButtonContainerColor: FunctionComponent<PropsWithChildren<ButtonContainerColorProps>> = ({
  colorScheme,
  children
}) => {
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        colorScheme === ButtonColorScheme.PRIMARY && [
          'bg-white/[0.08]',
          'group-enabled:group-hover:bg-yellow-500',
          'group-enabled:group-active:bg-yellow-700',
          'group-disabled:bg-white/[0.08]'
        ],
        colorScheme === ButtonColorScheme.GRADIENT && [
          'border',
          'border-solid',
          'border-transparent',
          'bg-main-gradient',
          'bg-origin-border',
          'group-enabled:group-hover:bg-main-gradient/40',
          'group-enabled:group-hover:border-yellow-500',
          'group-enabled:group-active:bg-yellow-700',
          'group-disabled:bg-main-gradient/40'
        ],
        colorScheme === ButtonColorScheme.ACTION && ['bg-purple-300']
      )}
    >
      {children}
    </div>
  )
}
