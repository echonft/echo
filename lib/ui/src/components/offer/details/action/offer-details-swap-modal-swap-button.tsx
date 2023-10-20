'use client'
import type { Offer } from '@echo/model/types/offer'
import { getExecuteSwapWagmiConfig } from '@echo/ui/helpers/contract/get-execute-swap-wagmi-config'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

interface Props {
  offer: Offer
  chainId: number
  signature: HexString
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
}

// TODO see how we complete the offer in the backend
export const OfferDetailsSwapModalSwapButton: FunctionComponent<Props> = ({ offer, chainId, signature }) => {
  const t = useTranslations('offer.details.swapModal')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { config } = usePrepareContractWrite(getExecuteSwapWagmiConfig(chainId, signature, offer))
  const { status, write } = useContractWrite(config)

  // TODO
  // useEffect(() => {
  //   recoverTypedDataAddress({
  //     ...getSignatureConfigForOffer(offer, chainId),
  //     signature:
  //       '0xd2803ffbc9d7ed28d0bc4336a8607096d0c9418fbfb26cbac5134c8f050c03595ea1c1201ac0e8cfdd9610fb9da67ecbeabc6aa2ced018d320688bebe6ca6c151b'
  //   })
  //     .then((address) => console.log(`recovered address is ${address}`))
  //     .catch((e) => console.log(`error is ${e}`))
  // }, [])
  return (
    <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={write} disabled={status !== 'idle'}>
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
    </button>
  )
}
