import { linkProvider } from '@echo/api/services/routing/link-provider'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { validateOffer } from '@echo/frontend/lib/helpers/offer/validate-offer'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { isOfferReceiver } from '@echo/model/helpers/offer/is-offer-receiver'
import { isOfferSender } from '@echo/model/helpers/offer/is-offer-sender'
import { BackButtonLayout } from '@echo/ui/components/base/layout/back-button-layout'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { ProfileOfferDetails } from '@echo/ui/pages/profile/offer/profile-offer-details'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextAuthUserParams<NextParams<Record<'id', string>>>

async function render({ params: { id }, user }: Params) {
  const t = await getTranslations({ namespace: 'offer.details' })
  const offer = await findOfferById(id)
  if (isNil(offer) || (!isOfferSender(offer, user.username) && !isOfferReceiver(offer, user.username))) {
    notFound()
  }
  const updatedOffer = await validateOffer(offer)
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <DetailsPaddedContainer>
          <BackButtonLayout title={t('backBtn.label')} path={linkProvider.profile.default.get()}>
            <ProfileOfferDetails offer={updatedOffer} user={user} />
          </BackButtonLayout>
        </DetailsPaddedContainer>
      </SectionLayout>
    </NavigationPageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
