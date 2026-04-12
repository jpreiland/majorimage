declare const __APP_VERSION__: string

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'symbols' {
  export function is_vowel(input: string): boolean
  export function is_consonant(input: string): boolean
}

declare module 'pluralize' {
  export function pluralize(input: string): string
}