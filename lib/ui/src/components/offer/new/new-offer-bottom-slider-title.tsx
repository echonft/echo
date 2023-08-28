import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  itemsSelectedCount: number
}

export const NewOfferBottomSliderTitle: FunctionComponent<Props> = ({ itemsSelectedCount }) => {
  const t = useTranslations('offer.new.bottomSlider')
  return (
    <div className={clsx('flex', 'items-center', 'justify-between', 'gap-2.5')}>
      <span
        className={clsx('prose-label-lg-semi', 'text-transparent', 'bg-main-gradient', 'bg-clip-text', 'uppercase')}
      >
        {t('title')}
      </span>
      <span className={clsx('px-2', 'bg-dark-300', 'rounded-lg', 'prose-header-xs', 'text-white')}>
        {itemsSelectedCount}
      </span>
    </div>
  )
}
