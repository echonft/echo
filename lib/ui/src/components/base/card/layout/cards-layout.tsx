'use client'
import { Alignment } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  alignment?: Alignment
}

export const CardsLayout: FunctionComponent<PropsWithChildren<Props>> = ({ alignment = Alignment.Left, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'grow',
        'flex-wrap',
        'gap-5',
        'h-max',
        'w-full',
        'outline-none',
        alignment === Alignment.Right ? 'flex-row-reverse' : 'flex-row',
        alignment === Alignment.Center && 'justify-center'
      )}
    >
      {children}
    </div>
  )
}
