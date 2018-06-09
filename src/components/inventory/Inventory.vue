<template>
  <div>
    <h2>Inventory</h2>
    <InventoryTable v-if="selected == null" :getSelectedItem=setSelectedItem :authtoken="this.authtoken" />
    <InventoryDisplay v-else :voucher=selected :clearSelected=clearSelected />
  </div>
</template>


<script>
import InventoryTable from './InventoryTable';
import InventoryDisplay from './InventoryDisplay';

export default {
  name: "Inventory",
  props: ['getSelectedItem',
          'authtoken'],
  components: {
    InventoryTable,
    InventoryDisplay,
  },
  data() {
    return {
      selected: null,
    };
  },
  created: function() {
    console.log(this.authtoken);
  },
  methods: {
    setSelectedItem(item) {
      this.selected = item;
    },
    clearSelected() {
      console.log('selected cleared');
      this.selected = null;
    }
  },
};
</script>