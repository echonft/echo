'use client'
import { NavigationSwaps } from '../../../constants/navigation-item'
import { messages } from '../../../messages/en'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { OfferRowsContainer } from '../../offer/layout/container/offer-rows-container'
import { UserNavigationLayout } from '../layout/user-navigation-layout'
import { UserSwapsEmpty } from '../swap/empty/user-swaps-empty'
import { OfferResponse } from '@echo/api'
import { mapOffer } from '@echo/ui-model'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { NextIntlClientProvider } from 'next-intl'
import { isEmpty, map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

dayjs.extend(timezone)

interface Props {
  username: string
  responses: Array<Partial<OfferResponse>>
}

export const UserSwapsApiProvided: FunctionComponent<Props> = ({ username, responses }) => {
  const mappedOffers = useMemo(() => map(mapOffer, responses), [responses])
  const dataIsEmpty = isEmpty(mappedOffers)

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <UserNavigationLayout username={username} activeNavigationItem={NavigationSwaps}>
        <HideIf condition={dataIsEmpty}>
          <OfferRowsContainer offers={mappedOffers} />
        </HideIf>
        <ShowIf condition={dataIsEmpty}>
          <UserSwapsEmpty username={username} />
        </ShowIf>
      </UserNavigationLayout>
    </NextIntlClientProvider>
  )
}
