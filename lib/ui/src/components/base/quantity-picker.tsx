'use client'
import { MinusIconSvg } from '@echo/ui/components/base/svg/minus-icon-svg'
import { PlusIconSvg } from '@echo/ui/components/base/svg/plus-icon-svg'
import { clsx } from 'clsx'
import { dec, inc, isNil, pipe, tap } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  initialQty?: number
  min?: number
  max?: number
  disabled?: boolean
  onQtyChange?: (qty: number) => unknown
}

export const QuantityPicker: FunctionComponent<Props> = ({ initialQty, min = 1, max, disabled, onQtyChange }) => {
  const [qty, setQty] = useState(initialQty ?? min)
  const incDisabled = !isNil(max) && qty === max
  const decDisabled = qty === min
  return (
    <div className={clsx('flex', 'flex-row', 'h-16', 'w-max', disabled && 'opacity-40')}>
      <div
        className={clsx(
          'flex',
          'flex-row',
          'justify-center',
          'items-center',
          'h-full',
          'w-28',
          'bg-dark-750',
          'rounded-tl-lg',
          'rounded-bl-lg',
          'border-t',
          'border-b',
          'border-l',
          'border-yellow-500/30'
        )}
      >
        <span className={clsx('font-inter', 'text-white', 'text-[1.5rem]', 'font-medium', '-translate-x-[0.4375rem]')}>
          {qty}
        </span>
      </div>
      <div className={clsx('flex', 'flex-row', 'h-full', 'w-max', '-translate-x-[0.875rem]')}>
        <button
          className={clsx(
            'flex',
            'flex-row',
            'justify-center',
            'items-center',
            'h-full',
            'w-16',
            'bg-dark-500',
            'rounded-tl-lg',
            'rounded-bl-lg',
            'border',
            'border-yellow-500/30',
            'text-yellow-500',
            !disabled && decDisabled ? 'text-yellow-500/40' : 'text-yellow-500'
          )}
          onClick={() => {
            pipe(
              dec,
              tap((qty) => {
                onQtyChange?.(qty)
              }),
              setQty
            )(qty)
          }}
          disabled={Boolean(disabled) || decDisabled}
        >
          <MinusIconSvg />
        </button>
        <button
          className={clsx(
            'flex',
            'flex-row',
            'justify-center',
            'items-center',
            'h-full',
            'w-16',
            'bg-dark-500',
            'rounded-tr-lg',
            'rounded-br-lg',
            'border',
            'border-t-yellow-500/30',
            'border-b-yellow-500/30',
            'border-r-yellow-500/30',
            'border-l-transparent',
            !disabled && incDisabled ? 'text-yellow-500/40' : 'text-yellow-500'
          )}
          onClick={() => {
            pipe(
              inc,
              tap((qty) => {
                onQtyChange?.(qty)
              }),
              setQty
            )(qty)
          }}
          disabled={Boolean(disabled) || incDisabled}
        >
          <PlusIconSvg />
        </button>
      </div>
    </div>
  )
}
