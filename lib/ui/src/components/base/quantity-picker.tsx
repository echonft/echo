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
  onQtyChange?: (qty: number) => unknown
}

export const QuantityPicker: FunctionComponent<Props> = ({ initialQty, min = 1, max, onQtyChange }) => {
  const [qty, setQty] = useState(initialQty ?? min)
  const incDisabled = !isNil(max) && qty === max
  const decDisabled = qty === min
  return (
    <div className={clsx('flex', 'flex-row', 'h-16', 'w-max')}>
      <div
        className={clsx(
          'flex',
          'flex-row',
          'justify-center',
          'items-center',
          'h-full',
          'w-28',
          'rounded-tl-lg',
          'rounded-bl-lg',
          'border-t',
          'border-b',
          'border-l',
          'border-yellow-500'
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
            'rounded-tl-lg',
            'rounded-bl-lg',
            'border',
            'border-yellow-500',
            'text-yellow-500',
            incDisabled && 'opacity-40'
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
          disabled={incDisabled}
        >
          <PlusIconSvg />
        </button>
        <button
          className={clsx(
            'flex',
            'flex-row',
            'justify-center',
            'items-center',
            'h-full',
            'w-16',
            'rounded-tr-lg',
            'rounded-br-lg',
            'border',
            'border-t-yellow-500',
            'border-b-yellow-500',
            'border-r-yellow-500',
            'border-l-transparent',
            'text-yellow-500',
            decDisabled && 'opacity-40'
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
          disabled={decDisabled}
        >
          <MinusIconSvg />
        </button>
      </div>
    </div>
  )
}
