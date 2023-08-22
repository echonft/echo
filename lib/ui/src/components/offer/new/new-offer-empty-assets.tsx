import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  onAddMore?: () => void
}

export const NewOfferEmptyAssets: FunctionComponent<Props> = ({ onAddMore }) => {
  const t = useTranslations('offer.new.bottomSlider')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'pt-8', 'items-center', 'grow')}>
      <span className={clsx('text-white/10', 'prose-display-sm')}>{t('noNftsTitle')}</span>
      <Disclosure.Button as={'button'} onClick={onAddMore}>
        <span className={clsx('text-white', 'prose-header-sm-semi', 'underline')}>{t('noNftsBtn')}</span>
      </Disclosure.Button>
    </div>
  )
}
