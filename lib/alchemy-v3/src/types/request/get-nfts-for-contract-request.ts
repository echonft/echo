export interface GetNftsForContractRequest extends Record<string, string> {
  contractAddress: string
  limit: string
  withMetadata: string
}
