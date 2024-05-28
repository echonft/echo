import { ERC721_ABI } from '@echo/web3/constants/erc721-abi'
import type { ExtractAbiEvent } from 'abitype'

export type ERC721TransferEvent = ExtractAbiEvent<typeof ERC721_ABI, 'Transfer'>
