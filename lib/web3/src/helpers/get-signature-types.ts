export function getSignatureTypes() {
  return {
    Trade: [
      { name: 'id', type: 'string' },
      { name: 'creator', type: 'address' },
      { name: 'counterparty', type: 'address' },
      { name: 'expiresAt', type: 'uint256' },
      { name: 'creatorCollections', type: 'address[]' },
      { name: 'creatorIds', type: 'uint256[]' },
      { name: 'counterpartyCollections', type: 'address[]' },
      { name: 'counterpartyIds', type: 'uint256[]' }
    ]
  } as const
}
