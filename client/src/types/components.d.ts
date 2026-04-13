import Descriptor from '../components/descriptors/Descriptor.vue'
import FilteredDescriptor from '../components/descriptors/FilteredDescriptor.vue'
import LinkedDescriptor from '../components/descriptors/LinkedDescriptor.vue'
import SimpleDescriptor from '../components/descriptors/SimpleDescriptor.vue'
import StealthDescriptor from '../components/descriptors/StealthDescriptor.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Descriptor: typeof Descriptor
    FilteredDescriptor: typeof FilteredDescriptor
    LinkedDescriptor: typeof LinkedDescriptor
    SimpleDescriptor: typeof SimpleDescriptor
    StealthDescriptor: typeof StealthDescriptor
  }
}