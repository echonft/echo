import type { Abi } from 'viem'

export const ECHO_ABI: Abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'InvalidAssets',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidCreator',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidPayment',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidSignature',
    type: 'error'
  },
  {
    inputs: [],
    name: 'LengthMismatch',
    type: 'error'
  },
  {
    inputs: [],
    name: 'Paused',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TradeAlreadyExist',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TradeHasExpired',
    type: 'error'
  },
  {
    inputs: [],
    name: 'WithdrawFailed',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'id',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address'
      }
    ],
    name: 'TradeExecuted',
    type: 'event'
  },
  {
    inputs: [],
    name: 'domainSeparator',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      {
        internalType: 'bytes1',
        name: 'fields',
        type: 'bytes1'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'version',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'verifyingContract',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32'
      },
      {
        internalType: 'uint256[]',
        name: 'extensions',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32'
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'id',
            type: 'string'
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'counterparty',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256'
          },
          {
            internalType: 'address[]',
            name: 'creatorCollections',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'creatorIds',
            type: 'uint256[]'
          },
          {
            internalType: 'address[]',
            name: 'counterpartyCollections',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'counterpartyIds',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct Trade',
        name: 'trade',
        type: 'tuple'
      }
    ],
    name: 'executeTrade',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'structHash',
        type: 'bytes32'
      }
    ],
    name: 'hashTypedData',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256'
      }
    ],
    name: 'setFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_paused',
        type: 'bool'
      }
    ],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'tradingFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
