import { linkProvider } from '@echo/api/services/routing/link-provider'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { validateOffer } from '@echo/frontend/lib/helpers/offer/validate-offer'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { isOfferReceiver } from '@echo/model/helpers/offer/is-offer-receiver'
import { isOfferSender } from '@echo/model/helpers/offer/is-offer-sender'
import { BackButtonLayout } from '@echo/ui/components/layout/back-button-layout'
import { DetailsPaddedContainer } from '@echo/ui/components/layout/details-padded-container'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { OfferDetailsApiProvided } from '@echo/ui/components/offer/api-provided/offer-details-api-provided'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { isNil } from 'ramda'

export default async function ({ params: { id } }: NextParams<Record<'id', string>>) {
  const user = await initializeServerComponent({ getAuthUser: true })
  const t = await getTranslations({ namespace: 'offer.details' })
  redirectIfNotLoggedIn(user, linkProvider.profile.offer.getUrl({ offerId: id }))
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
            <OfferDetailsApiProvided offer={updatedOffer} user={user} />
          </BackButtonLayout>
        </DetailsPaddedContainer>
      </SectionLayout>
    </NavigationPageLayout>
  )
}
