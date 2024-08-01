import { ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import type { Alignment } from '@echo/ui/types/alignment'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  alignment?: Alignment
}

export const OfferDetailsStateDetailsLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  alignment = ALIGNMENT_RIGHT,
  children
}) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'grow',
        'basis-0',
        '',
        alignment === ALIGNMENT_RIGHT ? 'items-end' : 'items-start'
      )}
    >
      {children}
    </div>
  )
}
