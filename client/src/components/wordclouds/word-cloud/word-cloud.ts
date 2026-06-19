import { CategoryName, DFMapName, GroupName, NumRangeOverride, PriceOverride, WordOverride } from '../../../../../shared/types'

interface BaseDescriptorItem {
  id: string | number
  component: 'simple' | 'descriptor'
  color?: string | string[]
  numRangeOverride?: NumRangeOverride
  priceOverride?: PriceOverride
  wordOverride?: WordOverride
  sequencedPick?: boolean
}

interface SimpleDescriptorItem extends BaseDescriptorItem {
  component: 'simple'
  type: GroupName | CategoryName
  a_an?: boolean
  properNoun?: boolean
  pickStyle?: string
}

interface DescriptorItem extends BaseDescriptorItem {
  component: 'descriptor'
  type: DFMapName
}

export type WordCloudItem = SimpleDescriptorItem  | DescriptorItem