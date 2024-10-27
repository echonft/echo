'use client'
import type { Chain } from '@echo/model/constants/chain'
import type { Address } from '@echo/model/types/address'
import { ExternalLink } from '@echo/ui/components/base/external-link'
import { ExternalLinkIconSvg } from '@echo/ui/components/base/svg/external-link-icon-svg'
import { useBlockExplorerLink } from '@echo/ui/hooks/use-block-explorer-link'
import { formatAddress } from '@echo/web3-dom/helpers/format-address'
import { shortenAddress } from '@echo/web3-dom/helpers/shorten-address'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip } from 'react-tooltip'

interface Props {
  address: Address
  chain?: Chain
}

export const WalletConnectedButton: FunctionComponent<Props> = ({ address, chain }) => {
  const t = useTranslations('wallet.button')
  const buttonId = `wallet-${address}`
  const walletLink = useBlockExplorerLink({ address, chain })
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
      <ExternalLink href={walletLink} style={{ inline: true }} key={walletLink}>
        <div className={clsx('border-2', 'border-white/[0.08]', 'rounded-r-lg', 'p-2')}>
          <ExternalLinkIconSvg width={23} height={23} />
        </div>
      </ExternalLink>
    </div>
  )
}
