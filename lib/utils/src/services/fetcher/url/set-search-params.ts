import { FetcherData } from '../../../types/fetcher-data'

export const setSearchParams =
  <T extends FetcherData>(data: T) =>
  (url: URL) => {
    Object.entries(data).forEach((dataPair) => {
      if (Array.isArray(dataPair[1])) {
        const name = dataPair[0]
        const values = dataPair[1]
        values.forEach((value) => {
          url.searchParams.append(`${name}[]`, value)
        })
      } else {
        url.searchParams.set(...(dataPair as [string, string]))
      }
    })
    return url
  }
