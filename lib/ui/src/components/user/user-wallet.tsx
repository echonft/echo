import { shortenAddress } from '@echo/utils'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  address: string
}

export const UserWallet: FunctionComponent<Props> = ({ address }) => {
  return (
    <div className={clsx('flex', 'py-px', 'px-2', 'bg-white/[0.08]', 'rounded-lg', 'w-max', 'items-center')}>
      <CopyToClipboard text={address}>
        <span className={clsx('prose-display-sm-bold', 'text-white', 'cursor-pointer')}>{shortenAddress(address)}</span>
      </CopyToClipboard>
    </div>
  )
}
