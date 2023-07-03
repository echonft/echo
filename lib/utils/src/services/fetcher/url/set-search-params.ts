export const setSearchParams =
  <T extends Record<string, string>>(data: T) =>
  (url: URL) => {
    Object.entries(data).forEach((item) => url.searchParams.set(...item))
    return url
  }
