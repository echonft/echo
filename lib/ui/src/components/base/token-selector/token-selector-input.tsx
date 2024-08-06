import { Input } from '@headlessui/react'
import { clsx } from 'clsx'
import { defaultTo } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  onValueChange?: (value: number) => unknown
  value?: number
  maxValue: number
}

export const TokenSelectorInput: FunctionComponent<Props> = ({ maxValue, onValueChange, value }) => {
  return (
    <Input
      type={'number'}
      max={maxValue}
      className={clsx(
        'flex',
        'grow',
        'bg-transparent',
        'rounded-lg',
        'border',
        'border-white/50',
        'py-2',
        'px-2.5',
        'h-9',
        'placeholder:text-white/50',
        'placeholder:prose-label-xs-semi',
        'prose-label-xs-semi',
        'text-white'
      )}
      name={'token'}
      placeholder={'Amount'}
      onChange={(event) => {
        onValueChange?.(Number(event.target.value))
      }}
      value={defaultTo('', value)}
    ></Input>
  )
}
