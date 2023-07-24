export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      STORYBOOK_ALCHEMY_API_KEY: string
    }
  }
}
