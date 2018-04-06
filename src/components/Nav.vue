<template>
    <div>
    <el-col :span="3">
        <el-menu :default-active="page.toString()" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-button v-if=isCollapse @click="toggleCollapse" icon="el-icon-arrow-right"/>
        <el-button v-else @click="toggleCollapse" icon="el-icon-arrow-left"/>
        <el-menu-item @click="setNavBar(1)" index="1">
            <i class="el-icon-upload"></i>
            <span slot="title">Upload</span>
        </el-menu-item>
        <el-menu-item @click="setNavBar(2)" index="2">
            <i class="el-icon-message"></i>
            <span slot="title">Send</span>
        </el-menu-item>
        <el-menu-item @click="setNavBar(3)" index="3">
            <i class="el-icon-tickets"></i>
            <span slot="title">Mailing Lists</span>
        </el-menu-item>
        <el-menu-item @click="setNavBar(4)" index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">Settings</span>
        </el-menu-item>
        <el-menu-item @click="setNavBar(5)" index="5">
            <i class="el-icon-star-off"></i>
            <span slot="title">Plans</span>
        </el-menu-item>
        <el-menu-item @click="setNavBar(6)" index="6">
            <i class="el-icon-info"></i>
            <span slot="title">Information</span>
        </el-menu-item>
        </el-menu>
    </el-col>
    </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        page: 1,
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toggleCollapse() {
            this.isCollapse = !this.isCollapse;
      },
      setNavBar(index) {
        this.page=index;
      }
    },
  }
</script>