'use client'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const LoginLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('flex', 'justify-center', 'pt-32', 'w-full')}>
      <div
        className={clsx(
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'w-max',
          'max-w-2xl',
          'p-8',
          'rounded-2xl',
          'border',
          'border-solid',
          'border-white/10'
        )}
      >
        {children}
      </div>
    </div>
  )
}
