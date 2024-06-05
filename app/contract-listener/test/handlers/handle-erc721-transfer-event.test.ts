import { handleErc721TransferEvent } from '@echo/contract-listener/handlers/handle-erc721-transfer-event'
import { processEscrowTransfer } from '@echo/contract-listener/helpers/process-escrow-transfer'
import { processInTransfer } from '@echo/contract-listener/helpers/process-in-transfer'
import { processOutTransfer } from '@echo/contract-listener/helpers/process-out-transfer'
import { processSwapTransfer } from '@echo/contract-listener/helpers/process-swap-transfer'
import type { EventLogHandlerArgs } from '@echo/contract-listener/types/event-log-handler-args'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getWalletDocumentDataMockById } from '@echo/firestore-mocks/wallet/get-wallet-document-data-mock-by-id'
import { walletMockCrewAddress, walletMockJohnnyAddress } from '@echo/model-mocks/wallet/wallet-mock'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import type { Erc721TransferEventLog } from '@echo/web3/types/log/erc721-transfer-event-log'
import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assocPath, pipe, toLower } from 'ramda'

jest.mock('@echo/contract-listener/helpers/process-escrow-transfer')
jest.mock('@echo/contract-listener/helpers/process-in-transfer')
jest.mock('@echo/contract-listener/helpers/process-out-transfer')
jest.mock('@echo/contract-listener/helpers/process-swap-transfer')
jest.mock('@echo/firestore/crud/wallet/get-wallet-by-address')

describe('parsers - handleErc721TransferEvent', () => {
  const chain: ChainName = 'blast'
  const johnnyAddress = walletMockJohnnyAddress()
  const crewAddress = walletMockCrewAddress()
  const randomAddress: Lowercase<HexString> = toLower('0xb89b705faa45e42c0fd0674a3420f0126c7197cd')
  const contractAddress: Lowercase<HexString> = '0xtest'
  const tokenId = 1
  const initialArgs: EventLogHandlerArgs<Erc721TransferEventLog> = {
    chain,
    log: {
      args: { from: getEchoAddressByChain(chain), to: johnnyAddress, tokenId },
      address: contractAddress,
      blockHash: '0xhash',
      blockNumber: 1,
      transactionHash: '0xtxHash'
    }
  }
  const processEscrowTransferMock = jest.mocked(processEscrowTransfer).mockResolvedValue()
  const processInTransferMock = jest.mocked(processInTransfer).mockResolvedValue()
  const processOutTransferMock = jest.mocked(processOutTransfer).mockResolvedValue()
  const processSwapTransferMock = jest.mocked(processSwapTransfer).mockResolvedValue()

  beforeAll(() => {
    jest.mocked(getWalletByAddress).mockImplementation(async ({ address }) => {
      if (address === johnnyAddress) {
        return Promise.resolve(getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC'))
      }
      if (address === crewAddress) {
        return Promise.resolve(getWalletDocumentDataMockById('h6oTcucifUZtxI2ZbqrS'))
      }
      return Promise.resolve(undefined)
    })
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should process escrow OUT transaction', async () => {
    const args = pipe<
      [EventLogHandlerArgs<Erc721TransferEventLog>],
      EventLogHandlerArgs<Erc721TransferEventLog>,
      EventLogHandlerArgs<Erc721TransferEventLog>
    >(
      assocPath(['log', 'args', 'from'], getEchoAddressByChain(chain)),
      assocPath(['log', 'args', 'to'], johnnyAddress)
    )(initialArgs)
    await handleErc721TransferEvent(args)
    expect(processEscrowTransferMock).toBeCalledWith({
      from: getEchoAddressByChain(chain),
      to: johnnyAddress,
      tokenId,
      contractAddress,
      chain
    })
    expect(processInTransferMock).not.toBeCalled()
    expect(processOutTransferMock).not.toBeCalled()
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should process escrow IN transaction', async () => {
    const args = pipe<
      [EventLogHandlerArgs<Erc721TransferEventLog>],
      EventLogHandlerArgs<Erc721TransferEventLog>,
      EventLogHandlerArgs<Erc721TransferEventLog>
    >(
      assocPath(['log', 'args', 'to'], getEchoAddressByChain(chain)),
      assocPath(['log', 'args', 'from'], johnnyAddress)
    )(initialArgs)
    await handleErc721TransferEvent(args)
    expect(processEscrowTransferMock).toBeCalledWith({
      from: johnnyAddress,
      to: getEchoAddressByChain(chain),
      tokenId,
      contractAddress,
      chain
    })
    expect(processInTransferMock).not.toBeCalled()
    expect(processOutTransferMock).not.toBeCalled()
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should process out transfer if to is nil', async () => {
    const args = pipe<
      [EventLogHandlerArgs<Erc721TransferEventLog>],
      EventLogHandlerArgs<Erc721TransferEventLog>,
      EventLogHandlerArgs<Erc721TransferEventLog>
    >(
      assocPath(['log', 'args', 'to'], randomAddress),
      assocPath(['log', 'args', 'from'], johnnyAddress)
    )(initialArgs)
    await handleErc721TransferEvent(args)
    expect(processOutTransferMock).toBeCalledWith({
      from: getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC'),
      to: undefined,
      tokenId,
      contractAddress,
      chain
    })
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should process in transfer if from is nil', async () => {
    const args = pipe<
      [EventLogHandlerArgs<Erc721TransferEventLog>],
      EventLogHandlerArgs<Erc721TransferEventLog>,
      EventLogHandlerArgs<Erc721TransferEventLog>
    >(
      assocPath(['log', 'args', 'from'], randomAddress),
      assocPath(['log', 'args', 'to'], johnnyAddress)
    )(initialArgs)
    await handleErc721TransferEvent(args)
    expect(processInTransferMock).toBeCalledWith({
      from: undefined,
      to: getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC'),
      tokenId,
      contractAddress,
      chain
    })
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should process swap transfer if both addresses are in our db', async () => {
    const args = pipe<
      [EventLogHandlerArgs<Erc721TransferEventLog>],
      EventLogHandlerArgs<Erc721TransferEventLog>,
      EventLogHandlerArgs<Erc721TransferEventLog>
    >(
      assocPath(['log', 'args', 'from'], crewAddress),
      assocPath(['log', 'args', 'to'], johnnyAddress)
    )(initialArgs)
    await handleErc721TransferEvent(args)
    expect(processSwapTransferMock).toBeCalledWith({
      from: getWalletDocumentDataMockById('h6oTcucifUZtxI2ZbqrS'),
      to: getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC'),
      tokenId,
      contractAddress,
      chain
    })
  })

  it('should not do anything if both addresses are not in our db', async () => {
    const args = pipe<
      [EventLogHandlerArgs<Erc721TransferEventLog>],
      EventLogHandlerArgs<Erc721TransferEventLog>,
      EventLogHandlerArgs<Erc721TransferEventLog>
    >(
      assocPath(['log', 'args', 'from'], randomAddress),
      assocPath(['log', 'args', 'to'], randomAddress)
    )(initialArgs)
    await handleErc721TransferEvent(args)
    expect(processEscrowTransferMock).not.toBeCalled()
    expect(processInTransferMock).not.toBeCalled()
    expect(processOutTransferMock).not.toBeCalled()
    expect(processSwapTransferMock).not.toBeCalled()
  })
})
