export const ECHO_ABI = [
  {
    inputs: [{ internalType: 'address' as const, name: 'owner' as const, type: 'address' as const }],
    stateMutability: 'nonpayable' as const,
    type: 'constructor' as const
  },
  { inputs: [], name: 'InvalidAssets' as const, type: 'error' as const },
  { inputs: [], name: 'InvalidCreator' as const, type: 'error' as const },
  { inputs: [], name: 'InvalidPayment' as const, type: 'error' as const },
  { inputs: [], name: 'InvalidSignature' as const, type: 'error' as const },
  { inputs: [], name: 'LengthMismatch' as const, type: 'error' as const },
  { inputs: [], name: 'Paused' as const, type: 'error' as const },
  { inputs: [], name: 'TradeAlreadyExist' as const, type: 'error' as const },
  { inputs: [], name: 'TradeHasExpired' as const, type: 'error' as const },
  { inputs: [], name: 'WithdrawFailed' as const, type: 'error' as const },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address' as const, name: 'user' as const, type: 'address' as const },
      { indexed: true, internalType: 'address' as const, name: 'newOwner' as const, type: 'address' as const }
    ],
    name: 'OwnershipTransferred' as const,
    type: 'event' as const
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'string' as const, name: 'id' as const, type: 'string' as const }],
    name: 'TradeExecuted' as const,
    type: 'event' as const
  },
  {
    inputs: [],
    name: 'domainSeparator' as const,
    outputs: [{ internalType: 'bytes32' as const, name: '', type: 'bytes32' as const }],
    stateMutability: 'view' as const,
    type: 'function' as const
  },
  {
    inputs: [],
    name: 'eip712Domain' as const,
    outputs: [
      { internalType: 'bytes1' as const, name: 'fields' as const, type: 'bytes1' as const },
      { internalType: 'string' as const, name: 'name' as const, type: 'string' as const },
      { internalType: 'string' as const, name: 'version' as const, type: 'string' as const },
      { internalType: 'uint256' as const, name: 'chainId' as const, type: 'uint256' as const },
      { internalType: 'address' as const, name: 'verifyingContract' as const, type: 'address' as const },
      { internalType: 'bytes32' as const, name: 'salt' as const, type: 'bytes32' as const },
      { internalType: 'uint256[]', name: 'extensions' as const, type: 'uint256[]' }
    ],
    stateMutability: 'view' as const,
    type: 'function' as const
  },
  {
    inputs: [
      { internalType: 'uint8' as const, name: 'v' as const, type: 'uint8' as const },
      { internalType: 'bytes32' as const, name: 'r' as const, type: 'bytes32' as const },
      { internalType: 'bytes32' as const, name: 's' as const, type: 'bytes32' as const },
      {
        components: [
          { internalType: 'string' as const, name: 'id' as const, type: 'string' as const },
          { internalType: 'address' as const, name: 'creator' as const, type: 'address' as const },
          { internalType: 'address' as const, name: 'counterparty' as const, type: 'address' as const },
          { internalType: 'uint256' as const, name: 'expiresAt' as const, type: 'uint256' as const },
          { internalType: 'address[]', name: 'creatorCollections' as const, type: 'address[]' },
          { internalType: 'uint256[]', name: 'creatorIds' as const, type: 'uint256[]' },
          { internalType: 'address[]', name: 'counterpartyCollections' as const, type: 'address[]' },
          { internalType: 'uint256[]', name: 'counterpartyIds' as const, type: 'uint256[]' }
        ],
        internalType: 'struct Trade',
        name: 'trade' as const,
        type: 'tuple' as const
      }
    ],
    name: 'executeTrade' as const,
    outputs: [],
    stateMutability: 'payable' as const,
    type: 'function' as const
  },
  {
    inputs: [{ internalType: 'bytes32' as const, name: 'structHash' as const, type: 'bytes32' as const }],
    name: 'hashTypedData' as const,
    outputs: [{ internalType: 'bytes32' as const, name: '', type: 'bytes32' as const }],
    stateMutability: 'view' as const,
    type: 'function' as const
  },
  {
    inputs: [],
    name: 'owner' as const,
    outputs: [{ internalType: 'address' as const, name: '', type: 'address' as const }],
    stateMutability: 'view' as const,
    type: 'function' as const
  },
  {
    inputs: [],
    name: 'paused' as const,
    outputs: [{ internalType: 'bool' as const, name: '', type: 'bool' as const }],
    stateMutability: 'view' as const,
    type: 'function' as const
  },
  {
    inputs: [{ internalType: 'uint256' as const, name: 'fee' as const, type: 'uint256' as const }],
    name: 'setFees' as const,
    outputs: [],
    stateMutability: 'nonpayable' as const,
    type: 'function' as const
  },
  {
    inputs: [{ internalType: 'bool' as const, name: '_paused' as const, type: 'bool' as const }],
    name: 'setPaused' as const,
    outputs: [],
    stateMutability: 'nonpayable' as const,
    type: 'function' as const
  },
  {
    inputs: [],
    name: 'tradingFee' as const,
    outputs: [{ internalType: 'uint256' as const, name: '', type: 'uint256' as const }],
    stateMutability: 'view' as const,
    type: 'function' as const
  },
  {
    inputs: [{ internalType: 'address' as const, name: 'newOwner' as const, type: 'address' as const }],
    name: 'transferOwnership' as const,
    outputs: [],
    stateMutability: 'nonpayable' as const,
    type: 'function' as const
  },
  {
    inputs: [{ internalType: 'address' as const, name: 'account' as const, type: 'address' as const }],
    name: 'withdraw' as const,
    outputs: [],
    stateMutability: 'nonpayable' as const,
    type: 'function' as const
  }
] as const
