import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import type { ModalOfferState } from '@echo/ui/types/modal-offer-state'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  state: ModalOfferState
}

export const OfferDetailsOfferActionModalSubtitle: FunctionComponent<Props> = ({ state }) => {
  const t = useTranslations(`offer.details.actionModal.${state}`)
  return <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
}
