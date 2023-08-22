// interface KeyData {
//   url: string
//   request: CreateListingRequest | undefined
// }

export const useCreateListing = () => undefined
// FIXME
// export const useCreateListing = (
//   discordId: string,
//   items: string[] | undefined,
//   target: TargetRequest[] | undefined
// ): SWRResponse<IdResponse, Error> =>
//   useSWR<IdResponse, Error, SwrKey<KeyData> | undefined>(
//     getConditionalFetchKey<KeyData>(
//       {
//         name: SwrKeyNames.API_CREATE_FOR_OFFER,
//         data: {
//           url: getCreateOfferUrl(),
//           request: {
//             discordGuildId: discordId,
//             items: items!,
//             target: target!
//           }
//         }
//       },
//       always(or(isNilOrEmpty(items), isNilOrEmpty(target)))
//     ),
//     converge(
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       (url: string, data: CreateListingRequest) => putData<IdResponse, CreateListingRequest>(url, data),
//       [path(['data', 'url']), path(['data', 'request'])]
//     )
//   )
