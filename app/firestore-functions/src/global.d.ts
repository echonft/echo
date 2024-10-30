import '@echo/utils/global'

declare global {
  interface JSON {
    parse<T>(obj: string): T
  }
}

export {}
