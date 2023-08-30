import { NewListingSliderSearchBox } from './new-listing-slider-search-box'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface NewListingSliderInnerContainerProps {}

export const NewListingSliderInnerContainer: FunctionComponent<NewListingSliderInnerContainerProps> = ({}) => {
  const t = useTranslations('listing.new.bottomSlider')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-6', 'py-3', 'pb-32')}>
      <NewListingSliderSearchBox placeholder={t('searchPlaceholder')} />
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6')}>
        <Disclosure.Button
          className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')}
          // disabled={isNilOrEmpty(receiverItems) || isNilOrEmpty(senderItems)}
          // onClick={() => setModalState('TO CONFIRM')}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalizeBtn')}</span>
        </Disclosure.Button>
      </div>
    </div>
  )
}
