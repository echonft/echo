import { ModalSubtitle } from '../../base/modal/modal-subtitle'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface OfferDetailsOfferActionModalSubtitleProps {
  state: 'CANCELLED' | 'REJECTED' | 'ACCEPTED'
}

export const OfferDetailsOfferActionModalSubtitle: FunctionComponent<OfferDetailsOfferActionModalSubtitleProps> = ({
  state
}) => {
  const t = useTranslations(`offer.details.actionModal.${state}`)
  return <ModalSubtitle subtitle={t('subtitle')} />
}
