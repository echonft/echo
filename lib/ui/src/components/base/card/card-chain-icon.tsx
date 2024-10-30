import { Chain } from '@echo/model/constants/chain'
import { BlastIcon } from '@echo/ui/components/base/icons/blast-icon'
import { EthereumIcon } from '@echo/ui/components/base/icons/ethereum-icon'
import { SeiIcon } from '@echo/ui/components/base/icons/sei-icon'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  chain: Chain
}

const CardChainIconPicker: FunctionComponent<Props> = ({ chain }) => {
  if (chain === Chain.Blast || chain === Chain.BlastSepolia) {
    return <BlastIcon />
  }
  if (chain === Chain.Sei) {
    return <SeiIcon />
  }
  return <EthereumIcon />
}
export const CardChainIcon: FunctionComponent<Props> = ({ chain }) => {
  return (
    <div className={clsx('absolute', 'top-2', 'right-2', 'h-max', 'w-max')}>
      <CardChainIconPicker chain={chain} />
    </div>
  )
}
