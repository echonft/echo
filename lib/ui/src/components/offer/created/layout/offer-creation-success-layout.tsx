import { OfferCreatedBannerSvg } from '@echo/ui/components/base/svg/offer-created-banner-svg'
import { OfferCreatedRocketSvg } from '@echo/ui/components/base/svg/offer-created-rocket-svg'
import { OfferCreationLayout } from '@echo/ui/components/offer/created/layout/offer-creation-layout'
import { DIRECTION_LEFT, DIRECTION_RIGHT } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const OfferCreationSuccessLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <OfferCreationLayout>
    <span className={clsx('absolute', '-top-10', '-left-0')}>
      <OfferCreatedBannerSvg direction={DIRECTION_LEFT} width={500} height={500} />
    </span>
    <span className={clsx('absolute', '-top-10', '-right-0')}>
      <OfferCreatedBannerSvg direction={DIRECTION_RIGHT} width={500} height={500} />
    </span>
    <span>
      <OfferCreatedRocketSvg />
    </span>
    {children}
  </OfferCreationLayout>
)
