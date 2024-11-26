'use client'
import type { Address } from '@echo/model/types/address'
import { ExternalLink } from '@echo/ui/components/base/external-link'
import { ExternalLinkIconSvg } from '@echo/ui/components/base/svg/external-link-icon-svg'
import type { Nullable } from '@echo/utils/types/nullable'
import { blockExplorerLinkForAddress } from '@echo/web3-dom/helpers/block-explorer-link-for-address'
import { formatAddress } from '@echo/web3-dom/helpers/format-address'
import { shortenAddress } from '@echo/web3-dom/helpers/shorten-address'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip } from 'react-tooltip'

interface WalletConnectedButtonProps {
  wallet: Nullable<Address>
}

export const WalletCopyToClipboardButton: FunctionComponent<WalletConnectedButtonProps> = ({ wallet }) => {
  const t = useTranslations('wallet.button')

  if (isNil(wallet)) {
    return null
  }

  const buttonId = `wallet-${wallet}`
  return (
    <div className={clsx('flex', 'flex-row')}>
      <div>
        <CopyToClipboard text={formatAddress(wallet)}>
          <button
            id={buttonId}
            className={clsx('btn-auth-alt', 'bg-white/[0.08]', 'border-none', 'rounded-none', 'rounded-l-lg')}
          >
            <span className={clsx('btn-label-auth')}>{shortenAddress(wallet)}</span>
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
      <ExternalLink href={blockExplorerLinkForAddress(wallet)} options={{ inline: true }}>
        <div
          className={clsx(
            'bg-transparent',
            'hover:bg-white/[0.08]',
            'bg-clip-padding',
            'flex',
            'items-center',
            'justify-center',
            'w-max',
            'h-full',
            'border-t',
            'border-r',
            'border-b',
            'border-white/[0.08]',
            'rounded-r-lg',
            'p-2',
            'text-white'
          )}
        >
          <ExternalLinkIconSvg width={23} height={23} />
        </div>
      </ExternalLink>
    </div>
  )
}
