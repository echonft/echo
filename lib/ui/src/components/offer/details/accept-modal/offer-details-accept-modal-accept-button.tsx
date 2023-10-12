'use client'
import { getSignatureConfigForOffer } from '@echo/ui/helpers/contract/get-signature-config-for-offer'
import { Offer } from '@echo/ui/types/model/offer'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { useSignTypedData } from 'wagmi'

interface Props {
  offer: Offer
  chainId: number
}

export const OfferDetailsAcceptModalAcceptButton: FunctionComponent<Props> = ({ offer, chainId }) => {
  const t = useTranslations('offer.details.acceptModal')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data, status, signTypedData } = useSignTypedData(getSignatureConfigForOffer(offer, chainId))
  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group', 'outline-none')}
      onClick={() => signTypedData()}
      disabled={status === 'loading'}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
    </button>
  )
}
