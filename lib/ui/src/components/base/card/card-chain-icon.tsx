import { BlastIcon } from '@echo/ui/components/base/icons/blast-icon'
import { EthereumIcon } from '@echo/ui/components/base/icons/ethereum-icon'
import { CHAIN_BLAST, TESTNET_CHAIN_BLAST } from '@echo/utils/constants/chains/chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  chain: ChainName
}

const CardChainIconPicker: FunctionComponent<Props> = ({ chain }) => {
  if (chain === CHAIN_BLAST || chain === TESTNET_CHAIN_BLAST) {
    return <BlastIcon />
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
