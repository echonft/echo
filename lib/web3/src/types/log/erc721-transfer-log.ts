import { type ERC721TransferEvent } from '@echo/web3/constants/erc721-events/erc721-transfer-event'
import type { Log } from 'viem'

export type Erc721TransferLog = Log<bigint, number, false, ERC721TransferEvent>
