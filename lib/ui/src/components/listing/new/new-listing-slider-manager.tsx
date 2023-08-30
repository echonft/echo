import { newListingDataState } from '../../../services/state'
import { BottomSlider } from '../../base/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '../../base/bottom-slider/bottom-slider-title'
import { HideIfNil } from '../../utils/hide-if-nil'
import { getListingItemsCount } from '@echo/ui-model'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

export const NewListingSliderManager: FunctionComponent = () => {
  const [newListing, setNewListing] = useRecoilState(newListingDataState)
  const t = useTranslations('listing.new.bottomSlider')

  return (
    <HideIfNil
      checks={newListing}
      render={() => (
        <BottomSlider
          renderTitle={() => <BottomSliderTitle title={t('title')} count={getListingItemsCount(newListing!)} />}
        >
          TODO
        </BottomSlider>
      )}
    ></HideIfNil>
  )
}
