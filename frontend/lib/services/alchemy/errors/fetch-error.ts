export class FetchNftsError extends Error {
  constructor(address: string, error: Error) {
    super(`Error fetching NFTs for ${address}: ${error}`)
  }
}

export class FetchContractsNftsError extends Error {
  constructor(contracts: string[], error: Error) {
    super(`Error fetching contract NFTs for ${contracts.join(',')}: ${error}`)
  }
}
