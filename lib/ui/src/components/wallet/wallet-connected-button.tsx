'use client'
import type { Wallet } from '@echo/model/types/wallet'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip } from 'react-tooltip'

interface Props {
  wallet: Wallet
}

export const WalletConnectedButton: FunctionComponent<Props> = ({ wallet }) => {
  const t = useTranslations('wallet.button')
  const buttonId = `wallet-${wallet.address}`

  return (
    <div className={clsx('w-max', 'h-max', 'relative')}>
      <CopyToClipboard text={formatAddress(wallet)}>
        <button id={buttonId} className={clsx('btn-auth-alt', 'bg-white/[0.08]', 'border-none')}>
          <WalletIconSvg width={24} />
          <span className={clsx('btn-label-auth')}>{shortenAddress(wallet)}</span>
        </button>
      </CopyToClipboard>
      <Tooltip
        className={clsx('tooltip')}
        anchorSelect={`#${buttonId}`}
        delayHide={500}
        opacity={1}
        content={t('copied')}
        openOnClick={true}
        noArrow={true}
        place={'bottom'}
        closeEvents={{ mouseleave: true, blur: true, click: true, dblclick: true, mouseup: true }}
      />
    </div>
  )
}
