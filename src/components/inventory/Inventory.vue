<template>
  <div>
    <h2>Inventory</h2>
    <InventoryTable v-if="selected == null" :getSelectedItem=setSelectedItem />
    <InventoryDisplay v-else :voucher=selected :clearSelected=clearSelected />
  </div>
</template>


<script>
import InventoryTable from './InventoryTable';
import InventoryDisplay from './InventoryDisplay';

export default {
  name: "Inventory",
  props: ['getSelectedItem'],
  components: {
    InventoryTable,
    InventoryDisplay,
  },
  data() {
    return {
      selected: null,
    };
  },
  methods: {
    setSelectedItem(item) {
      console.log(`Got items to parent${item}`);
      this.selected = item;
    },
    clearSelected() {
      console.log('selected cleared');
      this.selected = null;
    }
  },
};
</script>