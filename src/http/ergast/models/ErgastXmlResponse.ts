export interface ErgastXmlResponse<T> {
  "?xml": string
  "?xml-stylesheet": string
  MRData: T
}