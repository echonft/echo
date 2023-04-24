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
        'border-none',
        colorScheme === ButtonColorScheme.PRIMARY && [
          'bg-white/[0.08]',
          'group-hover:bg-yellow-500',
          'group-active:bg-yellow-700',
          'group-disabled:bg-white/[0.08]',
          'group-disabled:group-hover:bg-white/[0.08]'
        ],
        colorScheme === ButtonColorScheme.GRADIENT && [
          'bg-main-gradient',
          'group-hover:bg-main-gradient/40',
          'group-hover:border-solid',
          'group-hover:border-yellow-500',
          'group-active:bg-yellow-700',
          'group-disabled:bg-main-gradient/40',
          'group-disabled:group-hover:bg-main-gradient/40',
          'group-disabled:group-hover:border-none'
        ],
        colorScheme === ButtonColorScheme.ACTION && ['bg-purple-300']
      )}
    >
      {children}
    </div>
  )
}
