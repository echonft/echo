import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  count: number
  onClick?: MouseEventHandler
}

export const MakeOfferButton: FunctionComponent<Props> = ({ count, onClick }) => {
  const t = useTranslations('collection.button.makeOffer')
  return (
    <button
      disabled={count === 0}
      onClick={onClick}
      className={clsx('!justify-between', 'btn-gradient', 'group', 'rounded-lg', 'w-full', 'p-2.5')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{t('label')}</span>
      <div className={clsx('flex', 'items-center', 'justify-center', 'w-6', 'h-6', 'rounded-lg', 'bg-dark-300')}>
        <span
          className={clsx(
            'text-[0.9375rem]',
            'font-medium',
            'leading-[155%]',
            'tracking-[0.00938rem]',
            'font-inter',
            'text-white/50'
          )}
        >
          {count}
        </span>
      </div>
    </button>
  )
}
