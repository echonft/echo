'use client'
import type { Contract } from '@echo/model/types/contract'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/services/approve-erc721-contract'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  contract: Contract
  onApproved?: (contract: Contract, approved: boolean) => unknown
  onLoading?: EmptyFunction
  onError?: (contract: Contract) => void
}

export const OfferDetailsApproveContractButton: FunctionComponent<Props> = ({
  contract,
  onApproved,
  onError,
  onLoading
}) => {
  const t = useTranslations('offer.details.approveModal')
  const { approveErc721Contract } = useDependencies()
  const { trigger, isMutating } = useSWRTrigger<HexString, ApproveErc721ContractArgs>({
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
      className={clsx('btn-gradient', 'btn-size-alt', 'group')}
      onClick={() => {
        onLoading?.()
        void trigger({ contract })
      }}
      disabled={isMutating}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
        {t(isMutating ? 'btn.loading' : 'btn.label')}
      </span>
    </button>
  )
}
