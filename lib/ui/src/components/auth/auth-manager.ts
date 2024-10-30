'use client'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import { OfferDetailsRejectButton } from '@echo/ui/components/offer/details/action/offer-details-reject-button'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { useActions } from '@echo/ui/hooks/use-actions'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useWalletStore } from '@echo/ui/hooks/use-wallet-store'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  user: Nullable<User>
}

export const AuthManager: FunctionComponent<Props> = ({ user }) => {
  const { getWalletStatus } = useActions()
  const { login, logout, switchChain } = useDependencies()
  const { trigger } = useSWRTrigger<OfferResponse, Record<'slug', Slug>>({
    key: SWRKeys.offer.reject(offer),
    fetcher: rejectOffer,
    onSuccess: (response) => {
      onSuccess?.(assoc('role', offer.role, response.offer))
    },
    onError: {
      alert: { severity: CalloutSeverity.Error, message: tError('reject') },
      onError,
      loggerContext: {
        component: OfferDetailsRejectButton.name,
        fetcher: rejectOffer.name,
        offer
      }
    }
  })
  const { account, setNonceData, clearNonceData, nonce } = useWalletStore()

  return null
}
