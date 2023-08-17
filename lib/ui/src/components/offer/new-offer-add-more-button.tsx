import { AddIconSvg } from '../base/svg/add-icon-svg'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface NewOfferAddMoreButtonProps {
  onClick?: () => void
}

export const NewOfferAddMoreButton: FunctionComponent<NewOfferAddMoreButtonProps> = ({ onClick }) => {
  const t = useTranslations('offer.new.bottomSlider')
  // Not ideal to have a disclosure button here as it means it is only usable within a
  return (
    <Disclosure.Button
      as={'div'}
      onClick={onClick}
      className={clsx(
        'flex',
        'flex-col',
        'rounded-2xl',
        'w-32',
        'gap-2',
        'border',
        'border-dashed',
        'border-white/30',
        'justify-center',
        'items-center',
        'cursor-pointer'
      )}
    >
      <span className={clsx('bg-yellow-500', 'rounded-lg', 'p-2')}>
        <AddIconSvg />
      </span>
      <span className={clsx('prose-label-sm', 'text-white')}>{t('add')}</span>
    </Disclosure.Button>
  )
}
