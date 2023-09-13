import { ModalTitle } from '@echo/ui/components/layout/modal/modal-title'
import type { ModalOfferState } from '@echo/ui/types/modal-offer-state'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  state: ModalOfferState
}

export const OfferDetailsOfferActionModalTitle: FunctionComponent<Props> = ({ state }) => {
  const t = useTranslations(`offer.details.actionModal.${state}`)
  return <ModalTitle>{t('title')}</ModalTitle>
}
