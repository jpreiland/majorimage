import { createApp } from 'vue';
import App from './App.vue';
import Descriptor from './components/descriptors/Descriptor.vue'
import FilteredDescriptor from './components/descriptors/FilteredDescriptor.vue'
import LinkedDescriptor from './components/descriptors/LinkedDescriptor.vue'
import StealthDescriptor from './components/descriptors/StealthDescriptor.vue'
import './assets/app.css';

const app = createApp(App);

app
  .component('Descriptor', Descriptor)
  .component('FilteredDescriptor', FilteredDescriptor)
  .component('LinkedDescriptor', LinkedDescriptor)
  .component('StealthDescriptor', StealthDescriptor)

app.config.unwrapInjectedRef = true;
app.mount('#app');
