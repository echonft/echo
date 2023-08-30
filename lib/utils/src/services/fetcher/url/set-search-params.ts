import { isNil } from 'ramda'

export const setSearchParams = <T extends Record<string, string | number | string[] | undefined> | undefined>(
  url: URL,
  data: T
) => {
  if (!isNil(data)) {
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
  }
  return url
}
