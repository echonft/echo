import type { Erc721Abi } from '@echo/web3/types/erc721-abi-type'
import type { ExtractAbiEvent } from 'abitype'

export type ERC721TransferEvent = ExtractAbiEvent<Erc721Abi, 'Transfer'>
