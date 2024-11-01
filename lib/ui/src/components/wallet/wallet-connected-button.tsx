'use client'
import type { Chain } from '@echo/model/constants/chain'
import type { Address } from '@echo/model/types/address'
import type { Wallet } from '@echo/model/types/wallet'
import { ExternalLink } from '@echo/ui/components/base/external-link'
import { ExternalLinkIconSvg } from '@echo/ui/components/base/svg/external-link-icon-svg'
import type { Nullable } from '@echo/utils/types/nullable'
import { blockExplorerLinkFromChain } from '@echo/web3-dom/helpers/block-explorer-link-from-chain'
import { formatAddress } from '@echo/web3-dom/helpers/format-address'
import { shortenAddress } from '@echo/web3-dom/helpers/shorten-address'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip } from 'react-tooltip'

interface WalletConnectedButtonLinkProps {
  address: Address
  chain?: Chain
}

const WalletConnectedButtonLink: FunctionComponent<WalletConnectedButtonLinkProps> = ({ address, chain }) => {
  if (isNil(chain)) {
    return null
  }

  const walletLink = blockExplorerLinkFromChain({ address, chain })
  return (
    <ExternalLink href={walletLink} style={{ inline: true }} key={walletLink}>
      <div className={clsx('border-2', 'border-white/[0.08]', 'rounded-r-lg', 'p-2')}>
        <ExternalLinkIconSvg width={23} height={23} />
      </div>
    </ExternalLink>
  )
}

interface WalletConnectedButtonProps {
  wallet: Nullable<Wallet>
  chain?: Chain
}

export const WalletConnectedButton: FunctionComponent<WalletConnectedButtonProps> = ({ wallet, chain }) => {
  const t = useTranslations('wallet.button')

  if (isNil(wallet)) {
    return null
  }

  const { address } = wallet
  const buttonId = `wallet-${address}`
  return (
    <div className={clsx('flex', 'flex-row')}>
      <div>
        <CopyToClipboard text={formatAddress(address)}>
          <button
            id={buttonId}
            className={clsx('btn-auth-alt', 'bg-white/[0.08]', 'border-none', 'rounded-none', 'rounded-l-lg')}
          >
            <span className={clsx('btn-label-auth')}>{shortenAddress(address)}</span>
          </button>
        </CopyToClipboard>
        <Tooltip
          className={clsx('tooltip')}
          anchorSelect={`#${buttonId}`}
          delayHide={200}
          opacity={1}
          content={t('copied')}
          openOnClick={true}
          noArrow={true}
          place={'bottom'}
          closeEvents={{ mouseleave: true, blur: true, click: true, dblclick: true, mouseup: true }}
        />
      </div>
      <WalletConnectedButtonLink address={address} chain={chain} />
    </div>
  )
}
