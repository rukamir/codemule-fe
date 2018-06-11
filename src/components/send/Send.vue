<template>
  <div>
    <h2>Send Compnent</h2>
    <SendList v-if="this.selected == null" :getSelectedItem=setSelected :authtoken="this.authtoken" />
    <SendDisplay v-else :title="this.selected.title" :getSelectedItem=setSelected :authtoken="this.authtoken" />
  </div>
</template>

<script>
import SendList from './SendList';
import SendDisplay from './SendDisplay';

export default {
  name: "SendView",
  props: ['authtoken'],
  components: {
    SendList,
    SendDisplay,
  },
  data() {
    return {
      selected: null,
      jimmy: "",
    };
  },
  methods: {
    setSelected(item) {
      this.selected = item;
    },
  },
}
</script>
