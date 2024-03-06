'use client'
import { ALIGNMENT_CENTER, ALIGNMENT_LEFT, ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import type { Alignment } from '@echo/ui/types/alignment'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  alignment?: Alignment
}
export const CardsLayout: FunctionComponent<PropsWithChildren<Props>> = ({ alignment = ALIGNMENT_LEFT, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        alignment === ALIGNMENT_RIGHT ? 'flex-row-reverse' : 'flex-row',
        'grow',
        'flex-wrap',
        'gap-5',
        'h-max',
        alignment === ALIGNMENT_CENTER && 'justify-center'
      )}
    >
      {children}
    </div>
  )
}
