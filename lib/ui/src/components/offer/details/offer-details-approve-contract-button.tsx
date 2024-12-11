'use client'
import type { Address } from '@echo/model/types/address'
import type { HexString } from '@echo/model/types/hex-string'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  contract: Address
  onApproved?: (contract: Address, approved: boolean) => void
  onLoading?: VoidFunction
  onError?: (contract: Address) => void
}

export const OfferDetailsApproveContractButton: FunctionComponent<Props> = ({
  contract,
  onApproved,
  onError,
  onLoading
}) => {
  const t = useTranslations('offer.details.approveModal')
  const { approveErc721Contract } = useDependencies()
  const { trigger, isMutating } = useSWRTrigger<HexString, Address>({
    key: SWRKeys.contract.approveErc721(contract),
    fetcher: approveErc721Contract,
    onSuccess: () => {
      onApproved?.(contract, true)
    },
    onError: {
      onError: () => {
        onError?.(contract)
      },
      loggerContext: {
        component: OfferDetailsApproveContractButton.name,
        fetcher: approveErc721Contract.name,
        contract
      }
    }
  })

  return (
    <button
      className={clsx('btn-gradient', 'group')}
      onClick={() => {
        onLoading?.()
        void trigger(contract)
      }}
      disabled={isMutating}
    >
      <span className={clsx('btn-label-gradient')}>{t('btn')}</span>
    </button>
  )
}
