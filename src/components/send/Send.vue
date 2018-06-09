<template>
  <div>
    <h2>Send Compnent</h2>
    <SendList :getSelectedItem=getSelectedItem :authtoken="this.authtoken" />
  </div>
</template>

<script>
import SendList from './SendList';

export default {
  name: "SendView",
  props: ['getSelectedItem',
          'authtoken'],
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
