import { erc721TransferEventsSchema } from '@echo/web3/validators/erc721-transfer-event-schema'
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
      erc721TransferEventsSchema.parse(assoc('data', undefined, validRequest))
    }).toThrow()
  })
  it('valid', () => {
    expect(erc721TransferEventsSchema.parse(validRequest)).toStrictEqual([
      {
        contract: '0x43be93945e168a205d708f1a41a124fa302e1f76',
        from: '0x213be2f484ab480db4f18b0fe4c38e1c25877f09',
        to: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
        tokenId: 2
      }
    ])
  })
  it('valid request with other events', () => {
    expect(
      erc721TransferEventsSchema.parse([
        {
          blockHash: '0x975bc7286b826160016b483644a0dcf20065f9d0fb05552b5125325e881a6be4',
          blockNumber: '0x6c0cb97',
          contractAddress: '',
          cumulativeGasUsed: '0x0',
          effectiveGasPrice: '0x19a278ad00',
          from: '0x20f039821de7db6f543c7c07d419800eb9bd01af',
          gasUsed: '0x830c9',
          logs: [
            {
              address: '0x07d31999c2bae29086133a5c93b07a481c5ddaea',
              blockHash: '0x975bc7286b826160016b483644a0dcf20065f9d0fb05552b5125325e881a6be4',
              blockNumber: '0x6c0cb97',
              data: '0x',
              logIndex: '0x0',
              removed: false,
              topics: [
                '0x29b4fc7c563e5c9b23b0f5bef771f3129ee53ebecccd9ac7fda41aa2151960b3',
                '0x4a847196cd326df0b75cb3f5b9b2252ee1f02216f38282ddb30332837087ca76'
              ],
              transactionHash: '0x7c881823013c14f46a139f4f8d547bceb51e3925016a299b001fd2b09fcc8107',
              transactionIndex: '0x8'
            },
            {
              address: '0x906b768df31b0ee08bf641159a20f723a549a666',
              blockHash: '0x975bc7286b826160016b483644a0dcf20065f9d0fb05552b5125325e881a6be4',
              blockNumber: '0x6c0cb97',
              data: '0x0000000000000000000000000000000000000000000000000000000000000000',
              logIndex: '0x1',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x00000000000000000000000007d31999c2bae29086133a5c93b07a481c5ddaea',
                '0x000000000000000000000000213be2f484ab480db4f18b0fe4c38e1c25877f09',
                '0x000000000000000000000000000000000000000000000000000000000000012c'
              ],
              transactionHash: '0x7c881823013c14f46a139f4f8d547bceb51e3925016a299b001fd2b09fcc8107',
              transactionIndex: '0x8'
            },
            {
              address: '0xb74afffa0cfc3f6db7bf489cfeb6033d0a92762d',
              blockHash: '0x975bc7286b826160016b483644a0dcf20065f9d0fb05552b5125325e881a6be4',
              blockNumber: '0x6c0cb97',
              data: '0x0000000000000000000000000000000000000000000000000000000000000000',
              logIndex: '0x2',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x00000000000000000000000007d31999c2bae29086133a5c93b07a481c5ddaea',
                '0x00000000000000000000000020f039821de7db6f543c7c07d419800eb9bd01af',
                '0x0000000000000000000000000000000000000000000000000000000000000d67'
              ],
              transactionHash: '0x7c881823013c14f46a139f4f8d547bceb51e3925016a299b001fd2b09fcc8107',
              transactionIndex: '0x8'
            }
          ],
          logsBloom:
            '0x00040000000004000000000000000000000020001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000200000000008000000008000001000000000000000000000001010200000000000000000000001000000000000000000000000000002000000010000000000000000000000000000000404000000000000000000000000100000000000000000040800041000000800000000020000000000040000000000000400000000000000006000000000000000000000000000000000000000000000000000080000800000000000000000020000000080000000000000000000000000000000004',
          status: '0x1',
          to: '0x07d31999c2bae29086133a5c93b07a481c5ddaea',
          transactionHash: '0x7c881823013c14f46a139f4f8d547bceb51e3925016a299b001fd2b09fcc8107',
          transactionIndex: '0x0',
          type: '0x0'
        }
      ])
    ).toStrictEqual([
      {
        contract: '0x906b768df31b0ee08bf641159a20f723a549a666',
        from: '0x07d31999c2bae29086133a5c93b07a481c5ddaea',
        to: '0x213be2f484ab480db4f18b0fe4c38e1c25877f09',
        tokenId: 300
      },
      {
        contract: '0xb74afffa0cfc3f6db7bf489cfeb6033d0a92762d',
        from: '0x07d31999c2bae29086133a5c93b07a481c5ddaea',
        to: '0x20f039821de7db6f543c7c07d419800eb9bd01af',
        tokenId: 3431
      }
    ])
  })
  it('should validate multiple events and ignore invalid ones', () => {
    expect(
      erc721TransferEventsSchema.parse([
        {
          blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
          blockNumber: '0x6c0cd33',
          contractAddress: '',
          cumulativeGasUsed: '0x0',
          effectiveGasPrice: '0x17bfac7c00',
          from: '0x2df4971ae82c913c2e722b82ca97362f81338dc6',
          gasUsed: '0x154d15',
          logs: [
            {
              address: '0x11fe5fd7a9b7d27924ff9c8d9f594fb20a58af98',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x00000000000000000000000000000000000000000000000000000000000000970000000000000000000000000000000000000000000000000000000000000001',
              logIndex: '0x0',
              removed: false,
              topics: [
                '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                '0x00000000000000000000000008b9b03dd228137f7357b242aa4428c57931e009',
                '0x00000000000000000000000008b9b03dd228137f7357b242aa4428c57931e009',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0xe30fedd158a2e3b13e9badaeabafc5516e95e8c7',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x000000000000000000000000000000000000000000000000390d902595a9dc2f',
              logIndex: '0x1',
              removed: false,
              topics: [
                '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                '0x00000000000000000000000008b9b03dd228137f7357b242aa4428c57931e009',
                '0x000000000000000000000000a4cf2f53d1195addde9e4d3aca54f556895712f2'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0xe30fedd158a2e3b13e9badaeabafc5516e95e8c7',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x000000000000000000000000000000000000000000000000390d902595a9dc2f',
              logIndex: '0x2',
              removed: false,
              topics: [
                '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
                '0x000000000000000000000000a4cf2f53d1195addde9e4d3aca54f556895712f2'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0xe30fedd158a2e3b13e9badaeabafc5516e95e8c7',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x000000000000000000000000000000000000000000000000390d902595a9dc2f',
              logIndex: '0x3',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x000000000000000000000000a4cf2f53d1195addde9e4d3aca54f556895712f2',
                '0x0000000000000000000000008d5261cff8d63e71c772574eba63e64e6726ee06'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0xb75d0b03c06a926e488e2659df1a861f860bd3d1',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x0000000000000000000000000000000000000000000000000000000000183f79',
              logIndex: '0x4',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x0000000000000000000000008d5261cff8d63e71c772574eba63e64e6726ee06',
                '0x00000000000000000000000008b9b03dd228137f7357b242aa4428c57931e009'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x8d5261cff8d63e71c772574eba63e64e6726ee06',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x00000000000000000000000000000000000000000000000000000001960cdd470000000000000000000000000000000000000000000003b8c0893341c03c9168',
              logIndex: '0x5',
              removed: false,
              topics: ['0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1'],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x8d5261cff8d63e71c772574eba63e64e6726ee06',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000390d902595a9dc2f0000000000000000000000000000000000000000000000000000000000183f790000000000000000000000000000000000000000000000000000000000000000',
              logIndex: '0x6',
              removed: false,
              topics: [
                '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
                '0x000000000000000000000000a4cf2f53d1195addde9e4d3aca54f556895712f2',
                '0x00000000000000000000000008b9b03dd228137f7357b242aa4428c57931e009'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0xb75d0b03c06a926e488e2659df1a861f860bd3d1',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x0000000000000000000000000000000000000000000000000000000000183f79',
              logIndex: '0x7',
              removed: false,
              topics: [
                '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                '0x00000000000000000000000008b9b03dd228137f7357b242aa4428c57931e009',
                '0x000000000000000000000000438c25b8a4ddbd9a3601b65671de080a487351cf'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0xb75d0b03c06a926e488e2659df1a861f860bd3d1',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x0000000000000000000000000000000000000000000000000000000000183f79',
              logIndex: '0x8',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x00000000000000000000000008b9b03dd228137f7357b242aa4428c57931e009',
                '0x0000000000000000000000008e2585890638e507491a61b0a056ad117e149d8d'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x0bbda0f76e205fc6a160b90a09975fa443b3fe44',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x0000000000000000000000000000000000000000000000000000000000183f79',
              logIndex: '0x9',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x0000000000000000000000000000000000000000000000000000000000000000',
                '0x000000000000000000000000438c25b8a4ddbd9a3601b65671de080a487351cf'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x',
              logIndex: '0xa',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x0000000000000000000000000000000000000000000000000000000000000000',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6',
                '0x000000000000000000000000000000000000000000000000000000000000092e'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x',
              logIndex: '0xb',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x0000000000000000000000000000000000000000000000000000000000000000',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6',
                '0x000000000000000000000000000000000000000000000000000000000000092f'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x',
              logIndex: '0xc',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x0000000000000000000000000000000000000000000000000000000000000000',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6',
                '0x0000000000000000000000000000000000000000000000000000000000000930'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x',
              logIndex: '0xd',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x0000000000000000000000000000000000000000000000000000000000000000',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6',
                '0x0000000000000000000000000000000000000000000000000000000000000931'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x',
              logIndex: '0xe',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x0000000000000000000000000000000000000000000000000000000000000000',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6',
                '0x0000000000000000000000000000000000000000000000000000000000000932'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x0000000000000000000000000000000000000000000000003e23161004db080a',
              logIndex: '0xf',
              removed: false,
              topics: [
                '0xe59fdd36d0d223c0c7d996db7ad796880f45e1936cb0bb7ac102e7082e031487',
                '0x000000000000000000000000438c25b8a4ddbd9a3601b65671de080a487351cf',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x438c25b8a4ddbd9a3601b65671de080a487351cf',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x0000000000000000000000000000000000000000000000003e23161004db080a',
              logIndex: '0x10',
              removed: false,
              topics: [
                '0x405cd490ff67cf99c136739e05c83dd52e1bc6f79977c6a9ef22a490354cbe9a',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6',
                '0x000000000000000000000000114230129dabe4ed69c6390eec8682aa2cc4a6a6'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x30132a39c04738b8db956f280f8a4a95a747c0c0',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x0000000000000000000000000000000000000000000000008ac7230489e80000',
              logIndex: '0x11',
              removed: false,
              topics: [
                '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                '0x0000000000000000000000000000000000000000000000000000000000000000',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x53a5bc8ef6843396158cf2e5e5acc1c21c6a1be7',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x000000000000000000000000000000000000000000000000008e1bc9bf040000',
              logIndex: '0x12',
              removed: false,
              topics: [
                '0xe59fdd36d0d223c0c7d996db7ad796880f45e1936cb0bb7ac102e7082e031487',
                '0x00000000000000000000000008b9b03dd228137f7357b242aa4428c57931e009',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            },
            {
              address: '0x08b9b03dd228137f7357b242aa4428c57931e009',
              blockHash: '0x4d1432c7266e7410664f9a160350faf445501e2e1285691a5dd6242dfb3bf859',
              blockNumber: '0x6c0cd33',
              data: '0x00000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000003e23161004db080a0000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000000000000000000000000008e1bc9bf040000',
              logIndex: '0x13',
              removed: false,
              topics: [
                '0x0e382f3106fdd7157ce1790f3e0702bf2a597076e44f786acc0488466776c96f',
                '0x0000000000000000000000002df4971ae82c913c2e722b82ca97362f81338dc6',
                '0x0000000000000000000000000000000000000000000000000000000000000097',
                '0x0000000000000000000000000000000000000000000000000000000000000097'
              ],
              transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
              transactionIndex: '0xe'
            }
          ],
          logsBloom:
            '0x00210200000080000000000280040100008080200004000000010000000040008200000000000000009000004004200000000400000000000000000000a020000000000000000110000000180000002000000000000804001000009082000000100000000201800000020000000008800000000000840000004040100100000000012000001808000000000000000000800000018000000800000040404000000200000000000000000000002000000200800000020002000000000000400000100000220080000001000000000001023000800000082010000100000000200000500000000001008000080200100008000000000400004000001a0000000000',
          status: '0x1',
          to: '0x08b9b03dd228137f7357b242aa4428c57931e009',
          transactionHash: '0xa0f1696c8212ca7678698ee41f72995fff6c938a8bbef8f4ff352633e5f3ba28',
          transactionIndex: '0x0',
          type: '0x0'
        }
      ])
    ).toStrictEqual([
      {
        contract: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x2df4971ae82c913c2e722b82ca97362f81338dc6',
        tokenId: 2350
      },
      {
        contract: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x2df4971ae82c913c2e722b82ca97362f81338dc6',
        tokenId: 2351
      },
      {
        contract: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x2df4971ae82c913c2e722b82ca97362f81338dc6',
        tokenId: 2352
      },
      {
        contract: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x2df4971ae82c913c2e722b82ca97362f81338dc6',
        tokenId: 2353
      },
      {
        contract: '0x114230129dabe4ed69c6390eec8682aa2cc4a6a6',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x2df4971ae82c913c2e722b82ca97362f81338dc6',
        tokenId: 2354
      }
    ])
  })
})
