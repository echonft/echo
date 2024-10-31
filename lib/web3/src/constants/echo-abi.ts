export const echoAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'acceptOffer',
    inputs: [
      {
        name: 'offerId',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'cancelOffer',
    inputs: [
      {
        name: 'offerId',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'createOffer',
    inputs: [
      {
        name: 'offer',
        type: 'tuple',
        internalType: 'struct Offer',
        components: [
          {
            name: 'sender',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'receiver',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'senderItems',
            type: 'tuple',
            internalType: 'struct OfferItems',
            components: [
              {
                name: 'chainId',
                type: 'uint256',
                internalType: 'uint256'
              },
              {
                name: 'items',
                type: 'tuple[]',
                internalType: 'struct OfferItem[]',
                components: [
                  {
                    name: 'tokenAddress',
                    type: 'address',
                    internalType: 'address'
                  },
                  {
                    name: 'tokenType',
                    type: 'uint8',
                    internalType: 'enum TokenType'
                  },
                  {
                    name: 'tokenIdOrAmount',
                    type: 'uint256',
                    internalType: 'uint256'
                  }
                ]
              }
            ]
          },
          {
            name: 'receiverItems',
            type: 'tuple',
            internalType: 'struct OfferItems',
            components: [
              {
                name: 'chainId',
                type: 'uint256',
                internalType: 'uint256'
              },
              {
                name: 'items',
                type: 'tuple[]',
                internalType: 'struct OfferItem[]',
                components: [
                  {
                    name: 'tokenAddress',
                    type: 'address',
                    internalType: 'address'
                  },
                  {
                    name: 'tokenType',
                    type: 'uint8',
                    internalType: 'enum TokenType'
                  },
                  {
                    name: 'tokenIdOrAmount',
                    type: 'uint256',
                    internalType: 'uint256'
                  }
                ]
              }
            ]
          },
          {
            name: 'expiration',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'state',
            type: 'uint8',
            internalType: 'enum OfferState'
          }
        ]
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'creationPaused',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'executeOffer',
    inputs: [
      {
        name: 'offerId',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'offers',
    inputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    outputs: [
      {
        name: 'sender',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'senderItems',
        type: 'tuple',
        internalType: 'struct OfferItems',
        components: [
          {
            name: 'chainId',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'items',
            type: 'tuple[]',
            internalType: 'struct OfferItem[]',
            components: [
              {
                name: 'tokenAddress',
                type: 'address',
                internalType: 'address'
              },
              {
                name: 'tokenType',
                type: 'uint8',
                internalType: 'enum TokenType'
              },
              {
                name: 'tokenIdOrAmount',
                type: 'uint256',
                internalType: 'uint256'
              }
            ]
          }
        ]
      },
      {
        name: 'receiverItems',
        type: 'tuple',
        internalType: 'struct OfferItems',
        components: [
          {
            name: 'chainId',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'items',
            type: 'tuple[]',
            internalType: 'struct OfferItem[]',
            components: [
              {
                name: 'tokenAddress',
                type: 'address',
                internalType: 'address'
              },
              {
                name: 'tokenType',
                type: 'uint8',
                internalType: 'enum TokenType'
              },
              {
                name: 'tokenIdOrAmount',
                type: 'uint256',
                internalType: 'uint256'
              }
            ]
          }
        ]
      },
      {
        name: 'expiration',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'state',
        type: 'uint8',
        internalType: 'enum OfferState'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'onERC721Received',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bytes4',
        internalType: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'paused',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'redeemOffer',
    inputs: [
      {
        name: 'offerId',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setCreationPaused',
    inputs: [
      {
        name: '_creationPaused',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setFees',
    inputs: [
      {
        name: 'fee',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setPaused',
    inputs: [
      {
        name: '_paused',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'tradingFee',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'OfferAccepted',
    inputs: [
      {
        name: 'offerId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OfferCanceled',
    inputs: [
      {
        name: 'offerId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OfferCreated',
    inputs: [
      {
        name: 'offerId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OfferExecuted',
    inputs: [
      {
        name: 'offerId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OfferRedeeemed',
    inputs: [
      {
        name: 'offerId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32'
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'error',
    name: 'CreationPaused',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidAssets',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidOfferState',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidPayment',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidReceiver',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidRecipient',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidSender',
    inputs: []
  },
  {
    type: 'error',
    name: 'OfferHasExpired',
    inputs: []
  },
  {
    type: 'error',
    name: 'OfferHasNotExpired',
    inputs: []
  },
  {
    type: 'error',
    name: 'Paused',
    inputs: []
  },
  {
    type: 'error',
    name: 'WithdrawFailed',
    inputs: []
  }
] as const
