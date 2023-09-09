import { shortenAddress } from '@echo/utils'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  address: string
}

export const UserWallet: FunctionComponent<Props> = ({ address }) => {
  return (
    <div className={clsx('prose-label-xs-semi', 'px-5', 'py-2.5', 'bg-white/[0.08]', 'rounded-lg', 'w-max', 'h-max')}>
      <CopyToClipboard text={address}>
        <span className={clsx('text-white', 'cursor-pointer')}>{shortenAddress(address)}</span>
      </CopyToClipboard>
    </div>
  )
}
