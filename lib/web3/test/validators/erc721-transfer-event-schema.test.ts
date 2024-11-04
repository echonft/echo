import { erc721TransferEventSchema } from '@echo/web3/validators/erc721-transfer-event-schema'
import { describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('validators - erc721TransferEventSchema', () => {
  const validRequest = [
    {
      blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
      blockNumber: '0x63fd0c',
      contractAddress: undefined,
      cumulativeGasUsed: '0xab8e',
      effectiveGasPrice: '0x0',
      from: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0001',
      gasUsed: '0xab8e',
      logs: [],
      logsBloom:
        '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      status: '0x1',
      to: '0x4200000000000000000000000000000000000015',
      transactionHash: '0x9be1b45711f2f59110badb282be00277917b28a623c203d41f3a83c6f295cb7d',
      transactionIndex: '0x0',
      type: '0x7e'
    },
    {
      blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
      blockNumber: '0x63fd0c',
      contractAddress: undefined,
      cumulativeGasUsed: '0x5aafa',
      effectiveGasPrice: '0xf433c',
      from: '0x213be2f484ab480db4f18b0fe4c38e1c25877f09',
      gasUsed: '0x4ff6c',
      l1Fee: '0x4124c8f6ffa2',
      l1GasPrice: '0x8b7a2',
      l1GasUsed: '0x1458',
      logs: [
        {
          address: '0x43be93945e168a205d708f1a41a124fa302e1f76',
          topics: [
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            '0x000000000000000000000000213be2f484ab480db4f18b0fe4c38e1c25877f09',
            '0x000000000000000000000000f37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
            '0x0000000000000000000000000000000000000000000000000000000000000002'
          ],
          data: '0x',
          blockNumber: '0x63fd0c',
          transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
          transactionIndex: '0x1',
          blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
          logIndex: '0x0',
          removed: false
        },
        {
          address: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
          topics: [
            '0x395be2bdef7155640f1587948c5cf433c6fe9b88ad5669088d8bc1a9c61df3ee',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          data: '0x',
          blockNumber: '0x63fd0c',
          transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
          transactionIndex: '0x1',
          blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
          logIndex: '0x1',
          removed: false
        }
      ],
      logsBloom:
        '0x04000000000000110000000000000000000000040000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000008000001200000000000000000000000000000000000000000000000000000000000008000000000000000000000000010000000000000000000000000000000800000000090000000000100100000000000000000000000000000000000800100000000001000000000000000000000400000000000000002000000000800000000000000000000000000000000000000000000000000000000200000000000000000000000000000008000000000000200000000',
      status: '0x1',
      to: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
      transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
      transactionIndex: '0x1',
      type: '0x0'
    }
  ]

  it('throws if data is not valid', () => {
    expect(() => {
      erc721TransferEventSchema.parse(assoc('data', undefined, validRequest))
    }).toThrow()
  })
  it('valid', () => {
    expect(erc721TransferEventSchema.parse(validRequest)).toStrictEqual([
      {
        contract: '0x43be93945e168a205d708f1a41a124fa302e1f76',
        from: '0x213be2f484ab480db4f18b0fe4c38e1c25877f09',
        to: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
        tokenId: 2
      }
    ])
  })
})
