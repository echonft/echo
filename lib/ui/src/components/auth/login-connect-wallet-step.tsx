import { addWallet } from '@echo/api/services/fetcher/add-wallet'
import { getNonce } from '@echo/api/services/fetcher/get-nonce'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginFlowContinueButton } from '@echo/ui/components/auth/login-flow-continue-button'
import { LoginFlowSubtitle } from '@echo/ui/components/auth/login-flow-subtitle'
import { LoginFlowTitle } from '@echo/ui/components/auth/login-flow-title'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { ConnectWallet } from '@echo/ui/components/profile/wallet/connect-wallet'
import { signNonce } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { account } from '@echo/web3/helpers/wagmi/provider/account'
import { chain } from '@echo/web3/helpers/wagmi/provider/chain'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser
  onContinue?: VoidFunction
}

export const LoginConnectWalletStep: FunctionComponent<Props> = ({ user, onContinue }) => {
  const t = useTranslations('auth.step2')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>
      <LoginFlowTitle>{t('title')}</LoginFlowTitle>
      <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>
        <LoginFlowSubtitle>{t('subtitle')}</LoginFlowSubtitle>
        <Web3Provider>
          <ConnectWallet
            token={user.sessionToken}
            fetcher={{ addWallet, getNonce, signNonce }}
            provider={{ account, chain }}
          />
        </Web3Provider>
      </div>
      <div className={clsx('flex', 'justify-end', 'w-full')}>
        <LoginFlowContinueButton disabled={false} onClick={onContinue} />
      </div>
    </div>
  )
}
