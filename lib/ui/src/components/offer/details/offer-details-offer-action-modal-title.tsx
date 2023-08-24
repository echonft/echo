import { ModalTitle } from '../../base/modal/modal-title'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface OfferDetailsOfferActionModalTitleProps {
  state: 'CANCELLED' | 'REJECTED' | 'ACCEPTED'
}

export const OfferDetailsOfferActionModalTitle: FunctionComponent<OfferDetailsOfferActionModalTitleProps> = ({
  state
}) => {
  const t = useTranslations(`offer.details.actionModal.${state}`)
  return <ModalTitle title={t('title')} />
}
