import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  value: number | undefined
  onChange?: (value: number) => unknown
}

export const CollectionSelectorInput: FunctionComponent<Props> = ({ value, onChange }) => {
  const t = useTranslations('trade.collectionSelector')
  return (
    <div className={clsx('flex', 'flex-col', 'grow', 'relative')}>
      <input
        type={'number'}
        min={1}
        step={1}
        className={clsx(
          'bg-transparent',
          'rounded-lg',
          'border',
          'border-white/[0.08]',
          'py-2',
          'px-2.5',
          'h-9',
          'placeholder:text-white/50',
          'placeholder:prose-label-xs-semi',
          'prose-label-xs-semi',
          'text-white',
          'outline-none'
        )}
        placeholder={t('placeholder')}
        onChange={(event) => {
          try {
            onChange?.(Number(event.target.value))
          } catch (_err) {
            /* onChange won't be called */
          }
        }}
        value={value}
      />
    </div>
  )
}
