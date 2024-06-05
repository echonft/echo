export const echoAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'blastPointsAddress', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { inputs: [], name: 'CreationPaused', type: 'error' },
  { inputs: [], name: 'InvalidAssets', type: 'error' },
  { inputs: [], name: 'InvalidOfferState', type: 'error' },
  { inputs: [], name: 'InvalidPayment', type: 'error' },
  { inputs: [], name: 'InvalidReceiver', type: 'error' },
  { inputs: [], name: 'InvalidRecipient', type: 'error' },
  { inputs: [], name: 'InvalidSender', type: 'error' },
  { inputs: [], name: 'OfferHasExpired', type: 'error' },
  { inputs: [], name: 'OfferHasNotExpired', type: 'error' },
  { inputs: [], name: 'Paused', type: 'error' },
  { inputs: [], name: 'WithdrawFailed', type: 'error' },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'bytes32', name: 'offerId', type: 'bytes32' }],
    name: 'OfferAccepted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'bytes32', name: 'offerId', type: 'bytes32' }],
    name: 'OfferCanceled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'bytes32', name: 'offerId', type: 'bytes32' }],
    name: 'OfferCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'bytes32', name: 'offerId', type: 'bytes32' }],
    name: 'OfferExecuted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'offerId', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' }
    ],
    name: 'OfferRedeeemed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    inputs: [],
    name: 'BLAST',
    outputs: [{ internalType: 'contract IBlast', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'offerId', type: 'bytes32' }],
    name: 'acceptOffer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'offerId', type: 'bytes32' }],
    name: 'cancelOffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], name: 'claimGas', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'address', name: 'receiver', type: 'address' },
          {
            components: [
              { internalType: 'uint256', name: 'chainId', type: 'uint256' },
              {
                components: [
                  { internalType: 'address', name: 'tokenAddress', type: 'address' },
                  { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
                ],
                internalType: 'struct OfferItem[]',
                name: 'items',
                type: 'tuple[]'
              }
            ],
            internalType: 'struct OfferItems',
            name: 'senderItems',
            type: 'tuple'
          },
          {
            components: [
              { internalType: 'uint256', name: 'chainId', type: 'uint256' },
              {
                components: [
                  { internalType: 'address', name: 'tokenAddress', type: 'address' },
                  { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
                ],
                internalType: 'struct OfferItem[]',
                name: 'items',
                type: 'tuple[]'
              }
            ],
            internalType: 'struct OfferItems',
            name: 'receiverItems',
            type: 'tuple'
          },
          { internalType: 'uint256', name: 'expiration', type: 'uint256' },
          { internalType: 'enum OfferState', name: 'state', type: 'uint8' }
        ],
        internalType: 'struct Offer',
        name: 'offer',
        type: 'tuple'
      }
    ],
    name: 'createOffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'creationPaused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'offerId', type: 'bytes32' }],
    name: 'executeOffer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'offers',
    outputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      {
        components: [
          { internalType: 'uint256', name: 'chainId', type: 'uint256' },
          {
            components: [
              { internalType: 'address', name: 'tokenAddress', type: 'address' },
              { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
            ],
            internalType: 'struct OfferItem[]',
            name: 'items',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct OfferItems',
        name: 'senderItems',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'uint256', name: 'chainId', type: 'uint256' },
          {
            components: [
              { internalType: 'address', name: 'tokenAddress', type: 'address' },
              { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
            ],
            internalType: 'struct OfferItem[]',
            name: 'items',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct OfferItems',
        name: 'receiverItems',
        type: 'tuple'
      },
      { internalType: 'uint256', name: 'expiration', type: 'uint256' },
      { internalType: 'enum OfferState', name: 'state', type: 'uint8' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'bytes', name: '', type: 'bytes' }
    ],
    name: 'onERC721Received',
    outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'offerId', type: 'bytes32' }],
    name: 'redeemOffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bool', name: '_creationPaused', type: 'bool' }],
    name: 'setCreationPaused',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'fee', type: 'uint256' }],
    name: 'setFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bool', name: '_paused', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'tradingFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const
