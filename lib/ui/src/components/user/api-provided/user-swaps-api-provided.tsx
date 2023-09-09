'use client'
import { NavigationSwaps } from '../../../constants/navigation-item'
import { messages } from '../../../messages/en'
import { OfferRowsContainer } from '../../offer/layout/container/offer-rows-container'
import { UserNavigationLayout } from '../layout/user-navigation-layout'
import { OfferResponse } from '@echo/api'
import { mapOffer } from '@echo/ui-model'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { NextIntlClientProvider } from 'next-intl'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

dayjs.extend(timezone)

interface Props {
  username: string
  responses: Array<Partial<OfferResponse>>
}

export const UserSwapsApiProvided: FunctionComponent<Props> = ({ username, responses }) => {
  const mappedOffers = useMemo(() => map(mapOffer, responses), [responses])

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <UserNavigationLayout username={username} activeNavigationItem={NavigationSwaps}>
        <OfferRowsContainer offers={mappedOffers} />
      </UserNavigationLayout>
    </NextIntlClientProvider>
  )
}
