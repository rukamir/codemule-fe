<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Upload" name="0">Upload</el-tab-pane>
      <el-tab-pane label="Send" name="1">Send</el-tab-pane>
      <el-tab-pane label="Inventory" name="3">Inventory</el-tab-pane>
      <el-tab-pane label="Settings" name="4">Settings</el-tab-pane>
      <el-tab-pane label="Plans" name="5">Plans</el-tab-pane>
      <el-tab-pane label="Information" name="6">Information</el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
export default {
  name: "NavBar",
  props: ['getPage'],
  data() {
    return {};
  },
  methods: {
    handleClick(e) {
      this.getPage(e.name);
    }
  },
}
</script>
