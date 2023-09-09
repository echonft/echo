'use client'
import { NavigationSwaps } from '../../../constants/navigation-item'
import { messages } from '../../../messages/en'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { OfferRowsContainer } from '../../offer/layout/container/offer-rows-container'
import { CollectionNavigationLayout } from '../layout/collection-navigation-layout'
import { CollectionSwapsEmpty } from '../listing/empty/collection-swaps-empty'
import { OfferResponse } from '@echo/api'
import { mapOffer } from '@echo/ui-model'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { NextIntlClientProvider } from 'next-intl'
import { isEmpty, map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

dayjs.extend(timezone)

interface Props {
  collectionSlug: string
  responses: Array<Partial<OfferResponse>>
}

export const CollectionSwapsApiProvided: FunctionComponent<Props> = ({ collectionSlug, responses }) => {
  const mappedOffers = useMemo(() => map(mapOffer, responses), [responses])
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationSwaps}>
        <HideIf condition={dataIsEmpty}>
          <OfferRowsContainer offers={mappedOffers} />
        </HideIf>
        <ShowIf condition={dataIsEmpty}>
          <CollectionSwapsEmpty />
        </ShowIf>
      </CollectionNavigationLayout>
    </NextIntlClientProvider>
  )
}
