export const getAlchemyApiKey = (): string => {
  const apiKey = process.env.ALCHEMY_API_KEY
  // if (isNilOrEmpty(apiKey)) {
  //   throw Error(`.env should contain ALCHEMY_API_KEY`)
  // }
  return apiKey ?? 'caca'
}
