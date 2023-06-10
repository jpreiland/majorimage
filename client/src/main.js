import { createApp } from 'vue';
import App from './App.vue';
import Descriptor from './components/descriptors/Descriptor.vue'
import FilteredDescriptor from './components/descriptors/FilteredDescriptor.vue'
import LinkedDescriptor from './components/descriptors/LinkedDescriptor.vue'
import SimpleDescriptor from './components/descriptors/SimpleDescriptor.vue'
import StealthDescriptor from './components/descriptors/StealthDescriptor.vue'
import './assets/app.css';

const app = createApp(App)

app
  .component('Descriptor', Descriptor)
  .component('FilteredDescriptor', FilteredDescriptor)
  .component('LinkedDescriptor', LinkedDescriptor)
  .component('SimpleDescriptor', SimpleDescriptor)
  .component('StealthDescriptor', StealthDescriptor)

app.mount('#app');
