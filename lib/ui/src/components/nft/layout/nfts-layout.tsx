import { AlignmentCenter, AlignmentLeft, AlignmentRight } from '@echo/ui/constants/alignment'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  alignment?: typeof AlignmentLeft | typeof AlignmentCenter | typeof AlignmentRight
}
export const NftsLayout: FunctionComponent<PropsWithChildren<Props>> = ({ alignment = AlignmentLeft, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        alignment === AlignmentRight ? 'flex-row-reverse' : 'flex-row',
        'grow',
        'flex-wrap',
        'gap-6',
        'h-max',
        alignment === AlignmentCenter && 'justify-center'
      )}
    >
      {children}
    </div>
  )
}
