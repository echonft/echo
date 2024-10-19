'use client'
import type { GetOfferByIdContractRequest } from '@echo/api/types/requests/get-offer-by-id-contract-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { Expiration } from '@echo/model/constants/expiration'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { buildBaseOffer } from '@echo/model/helpers/offer/build-base-offer'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Offer } from '@echo/model/types/offer/offer'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalDescription } from '@echo/ui/components/base/modal/modal-description'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractCreateOfferArgs } from '@echo/web3-dom/types/contract-create-offer-args'
import { generateOfferId } from '@echo/web3/helpers/generate-offer-id'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { NonEmptyArray } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

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
  const { getOfferByIdContract, contractCreateOffer } = useDependencies()
  const baseOffer = useMemo(
    () =>
      buildBaseOffer({
        receiverOfferItems: receiverItems,
        senderOfferItems: senderItems,
        expiresAt: expirationToDateNumber(expiration)
      }),
    [expiration, receiverItems, senderItems]
  )
  const idContract = useMemo(() => generateOfferId(baseOffer), [baseOffer])
  const { trigger: getOfferTrigger, isMutating: isGetOfferMutating } = useSWRTrigger<
    OfferResponse,
    GetOfferByIdContractRequest
  >({
    key: SWRKeys.offer.getByIdContract(idContract),
    fetcher: getOfferByIdContract,
    onSuccess: (response) => {
      onSuccess?.(response.offer)
    },
    // TODO better error handling?
    onError: {
      loggerContext: { component: CreateOfferModal.name, fetcher: getOfferByIdContract.name, offer: baseOffer }
    }
  })
  const { trigger: triggerContractCreate, isMutating: isContractCreateMutating } = useSWRTrigger<
    HexString,
    ContractCreateOfferArgs
  >({
    key: SWRKeys.offer.contractCreate,
    fetcher: contractCreateOffer,
    onSuccess: () => {
      void getOfferTrigger({ idContract })
    },
    onError: {
      alert: { severity: CalloutSeverity.Error, message: tError('new') },
      loggerContext: { component: CreateOfferModal.name, fetcher: contractCreateOffer.name, offer: baseOffer }
    }
  })

  const isMutating = isGetOfferMutating || isContractCreateMutating

  return (
    <Modal open={open} onClose={isMutating ? undefined : onClose}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('create.subtitle')}</ModalSubtitle>
        <ModalDescription>{t('create.description', { count: baseOffer.senderItems.length })}</ModalDescription>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', isMutating && 'animate-pulse')}
          onClick={() => {
            void triggerContractCreate({ offer: baseOffer })
          }}
          disabled={isMutating}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
            {t(isMutating ? 'create.btn.loading' : 'create.btn.label')}
          </span>
        </button>
      </div>
    </Modal>
  )
}
