import { CategoryName, GroupName } from '../../../../../shared/types'

export interface WordCloudItem {
  id: string | number
  type: GroupName | CategoryName
  color: string | string[]
}