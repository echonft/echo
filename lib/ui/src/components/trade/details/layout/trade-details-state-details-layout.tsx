import { Alignment } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  alignment?: Alignment
}

export const TradeDetailsStateDetailsLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  alignment = Alignment.Right,
  children
}) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'grow',
        'basis-0',
        alignment === Alignment.Right ? 'items-end' : 'items-start'
      )}
    >
      {children}
    </div>
  )
}
