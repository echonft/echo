export const ECHO_ABI = [
  {
    type: 'constructor',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'signer', type: 'address', internalType: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'domainSeparator',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'eip712Domain',
    inputs: [],
    outputs: [
      { name: 'fields', type: 'bytes1', internalType: 'bytes1' },
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'version', type: 'string', internalType: 'string' },
      { name: 'chainId', type: 'uint256', internalType: 'uint256' },
      { name: 'verifyingContract', type: 'address', internalType: 'address' },
      { name: 'salt', type: 'bytes32', internalType: 'bytes32' },
      { name: 'extensions', type: 'uint256[]', internalType: 'uint256[]' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'executeTrade',
    inputs: [
      { name: 'v', type: 'uint8', internalType: 'uint8' },
      { name: 'r', type: 'bytes32', internalType: 'bytes32' },
      { name: 's', type: 'bytes32', internalType: 'bytes32' },
      {
        name: 'signatureData',
        type: 'tuple',
        internalType: 'struct Signature',
        components: [
          { name: 'v', type: 'uint8', internalType: 'uint8' },
          { name: 'r', type: 'bytes32', internalType: 'bytes32' },
          { name: 's', type: 'bytes32', internalType: 'bytes32' }
        ]
      },
      {
        name: 'trade',
        type: 'tuple',
        internalType: 'struct Trade',
        components: [
          { name: 'id', type: 'string', internalType: 'string' },
          { name: 'creator', type: 'address', internalType: 'address' },
          { name: 'counterparty', type: 'address', internalType: 'address' },
          { name: 'expiresAt', type: 'uint256', internalType: 'uint256' },
          { name: 'creatorCollections', type: 'address[]', internalType: 'address[]' },
          { name: 'creatorIds', type: 'uint256[]', internalType: 'uint256[]' },
          { name: 'counterpartyCollections', type: 'address[]', internalType: 'address[]' },
          { name: 'counterpartyIds', type: 'uint256[]', internalType: 'uint256[]' }
        ]
      }
    ],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'hashTypedData',
    inputs: [{ name: 'structHash', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'paused',
    inputs: [],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'setFees',
    inputs: [{ name: 'fee', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setPaused',
    inputs: [{ name: '_paused', type: 'bool', internalType: 'bool' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setSigner',
    inputs: [{ name: '_signer', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'signer',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'tradingFee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'newOwner', type: 'address', indexed: true, internalType: 'address' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TradeExecuted',
    inputs: [{ name: 'id', type: 'string', indexed: false, internalType: 'string' }],
    anonymous: false
  },
  { type: 'error', name: 'InvalidAddress', inputs: [] },
  { type: 'error', name: 'InvalidAssets', inputs: [] },
  { type: 'error', name: 'InvalidCreator', inputs: [] },
  { type: 'error', name: 'InvalidPayment', inputs: [] },
  { type: 'error', name: 'InvalidSignature', inputs: [] },
  { type: 'error', name: 'InvalidSigner', inputs: [] },
  { type: 'error', name: 'LengthMismatch', inputs: [] },
  { type: 'error', name: 'Paused', inputs: [] },
  { type: 'error', name: 'TradeAlreadyExist', inputs: [] },
  { type: 'error', name: 'TradeHasExpired', inputs: [] },
  { type: 'error', name: 'WithdrawFailed', inputs: [] }
] as const
