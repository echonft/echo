import { isDev } from '@echo/utils/constants/is-dev'
import type { ChainName } from '@echo/utils/types/chain-name'

export const SUPPORTED_CHAINS: ChainName[] = isDev ? ['blast_sepolia'] : ['blast']
