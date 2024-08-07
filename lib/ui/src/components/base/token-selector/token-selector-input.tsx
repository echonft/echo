import { Input } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { defaultTo } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  onValueChange?: (value: number) => unknown
  value?: number
  balance: number
}

export const TokenSelectorInput: FunctionComponent<Props> = ({ balance, onValueChange, value }) => {
  const t = useTranslations('tokenSelector')
  return (
    <div className={clsx('flex', 'flex-col', 'grow')}>
      <span className={clsx('prose-paragraph-xs', 'text-white/50')}>{t('balance', { balance })}</span>
      <Input
        type={'number'}
        max={balance}
        min={0}
        className={clsx(
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
    </div>
  )
}
