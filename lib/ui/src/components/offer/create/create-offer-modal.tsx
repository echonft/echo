'use client'
import type { Expiration } from '@echo/model/constants/expiration'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { buildBaseOffer } from '@echo/model/helpers/offer/build-base-offer'
import type { OwnedNft } from '@echo/model/types/nft'
import type { BaseOffer, Offer } from '@echo/model/types/offer'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalDescription } from '@echo/ui/components/base/modal/modal-description'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useActions } from '@echo/ui/hooks/use-actions'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'

interface Props {
  senderItems: NonEmptyArray<OwnedNft>
  receiverItems: NonEmptyArray<OwnedNft>
  expiration: Expiration
  open: boolean
  onClose?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
}

export const CreateOfferModal: FunctionComponent<Props> = ({
  senderItems,
  receiverItems,
  expiration,
  open,
  onClose,
  onSuccess
}) => {
  const t = useTranslations('offer.create.modal')
  const tError = useTranslations('error.offer')
  const [loading, setLoading] = useState(false)
  const { getOfferByIdContract } = useActions()
  const { createOffer } = useDependencies()
  const baseOffer = useMemo(
    () =>
      buildBaseOffer({
        receiverOfferItems: receiverItems,
        senderOfferItems: senderItems,
        expiresAt: expirationToDateNumber(expiration)
      }),
    [expiration, receiverItems, senderItems]
  )
  const onCreate = useCallback(
    async (baseOffer: BaseOffer) => {
      try {
        const idContract = await createOffer(baseOffer)
        const offer = await getOfferByIdContract(idContract)
        onSuccess?.(offer)
      } catch (err) {
        errorCallback({
          alert: { severity: CalloutSeverity.Error, message: tError('create') },
          loggerContext: { offer: baseOffer }
        })(err)
      } finally {
        setLoading(false)
      }
    },
    [createOffer, getOfferByIdContract, onSuccess, tError]
  )

  return (
    <Modal open={open} onClose={loading ? undefined : onClose}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('create.subtitle')}</ModalSubtitle>
        <ModalDescription>{t('create.description', { count: baseOffer.senderItems.length })}</ModalDescription>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
          onClick={() => {
            setLoading(true)
            void onCreate(baseOffer)
          }}
          disabled={loading}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
            {t(loading ? 'create.btn.loading' : 'create.btn.label')}
          </span>
        </button>
      </div>
    </Modal>
  )
}
