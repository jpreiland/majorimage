declare module 'src/lib/a-vs-an/avs-an-simple' {
  interface AvsAnSimpleType {
    raw: Record<string, any>
    query(word: string): 'a' | 'an'
  }

  const AvsAnSimple: AvsAnSimpleType
  export default AvsAnSimple
}