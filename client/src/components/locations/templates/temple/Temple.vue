<template>
  <div class="info-panel-description">
    here is the basic temple template 
    <Descriptor :type="'__Price'" :color="'purple'" />
    <Descriptor :type="'__Price'" :color="'gold'" />
    <Descriptor :type="'__Price'" :color="'silver'" />
    <Descriptor :type="'__Price'" :color="'orange'" />
    <Descriptor :type="'__Price'" :color="'gold'" :price-override="{min: 123, max: 555, denomination: 'gold'}" />
  </div>
</template>

<script>
export default {
  name: 'BasicTemple'
}
</script>