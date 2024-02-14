'use client'
import type { Wallet } from '@echo/model/types/wallet'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
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
    <div className={classes('w-max', 'h-max', 'relative')}>
      <CopyToClipboard text={formatAddress(wallet)}>
        <button id={buttonId} className={classes('btn-primary', 'group', 'gap-2.5', 'h-[1.875rem]', 'w-max', 'px-2.5')}>
          <span className={classes('btn-label-primary')}>
            <WalletIconSvg />
          </span>
          <span className={classes('btn-label-primary', 'prose-label-xs', '!tracking-[0.015rem]')}>
            {shortenAddress(wallet)}
          </span>
        </button>
      </CopyToClipboard>
      <Tooltip
        className={classes('tooltip')}
        anchorSelect={`#${buttonId}`}
        delayHide={800}
        content={t('copied')}
        openOnClick={true}
        noArrow={true}
      />
    </div>
  )
}
