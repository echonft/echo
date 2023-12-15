'use client'
import type { Contract } from '@echo/model/types/contract'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/helpers/wagmi/fetcher/approve-erc721-contract'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  contract: Contract
  fetcher: {
    approveErc721Contract: Fetcher<HexString, ApproveErc721ContractArgs>
  }
  onApproved?: (contract: Contract, approved: boolean) => unknown
  onError?: EmptyFunction
  onLoading?: EmptyFunction
}

export const OfferDetailsApproveContractButton: FunctionComponent<Props> = ({
  contract,
  fetcher,
  onApproved,
  onError,
  onLoading
}) => {
  const t = useTranslations('offer.details.approveModal')
  const { trigger, isMutating } = useSWRTrigger<HexString, ApproveErc721ContractArgs>({
    key: SWRKeys.contract.approveErc721(contract),
    fetcher: fetcher.approveErc721Contract,
    onSuccess: () => {
      onApproved?.(contract, true)
    },
    onError: { onError }
  })

  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group')}
      onClick={() => {
        onLoading?.()
        void trigger({ contract })
      }}
      disabled={isMutating}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('btn')}</span>
    </button>
  )
}
