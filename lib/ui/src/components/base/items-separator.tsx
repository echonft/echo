import { EchoIconSvg } from '@echo/ui/components/base/svg/echo-icon-svg'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  disabled?: boolean
}
export const ItemsSeparator: FunctionComponent<Props> = ({ disabled }) => (
  <div className={clsx('flex', 'flex-row', 'items-center', 'w-full', disabled && 'opacity-40')}>
    <div className={clsx('bg-white/[0.08]', 'grow', 'h-0.5')} />
    <div className={clsx('flex', 'flex-row', 'justify-center', 'items-center', 'w-[3.875rem]', 'h-[3.875rem]')}>
      <span className={clsx('text-yellow-500')}>
        <EchoIconSvg height={31} width={31} />
      </span>
    </div>
    <div className={clsx('bg-white/[0.08]', 'grow', 'h-0.5')} />
  </div>
)
