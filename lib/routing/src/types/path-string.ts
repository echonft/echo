// Define valid characters for URL paths
type LowercaseChar =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type SpecialChar = '-' | '.' | '_' | '~' | '!' | '$' | '&' | "'" | '(' | ')' | '*' | '+' | ',' | ';' | '=' | ':' | '@'

type ValidPathChar = LowercaseChar | Digit | SpecialChar

type PathSegment = `${ValidPathChar}${string}`

export type PathString = '/' | `/${PathSegment}` | `/${PathSegment}/${string}`
