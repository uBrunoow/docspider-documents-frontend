import { IBase } from '../base/base'

export interface IDocuments extends IBase {
  title: string
  description: string
  document: string
  filename: string
}
