<template>
  <div>
    <h2>Send Compnent</h2>
    <SendList :getSelectedItem=getSelectedItem />
  </div>
</template>

<script>
import SendList from './SendList';

export default {
  name: "SendView",
  props: ['getSelectedItem'],
  components: {
    SendList,
  },
  data() {
    return {
      jimmy: "",
    };
  },
}
</script>
