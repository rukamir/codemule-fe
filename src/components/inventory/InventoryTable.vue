<template>
  <div>
    <el-table
    :data="tableData"
    offset="2"
    @row-click=selectItem>
    <el-table-column
      sortable
      prop="title"
      label="Title">
    </el-table-column>
    <el-table-column
      class="hidden-lg-and-down"
      type="hidden-lg-and-down"
      hidden-lg-and-down
      prop="description"
      label="Description"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      class="hidden-lg-and-down"
      type="hidden-lg-and-down"
      hidden-lg-and-down
      prop="unique"
      label="Unique"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      class="hidden-lg-and-down"
      type="hidden-lg-and-down"
      hidden-lg-and-down
      prop="expiration"
      label="Expiration"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      class="hidden-lg-and-down"
      type="hidden-lg-and-down"
      hidden-lg-and-down
      prop="filename"
      label="File"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      class="hidden-lg-and-down"
      type="hidden-lg-and-down"
      hidden-lg-and-down
      prop="added"
      label="Added"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      class="hidden-lg-and-down"
      type="hidden-lg-and-down"
      hidden-lg-and-down
      prop="status"
      label="Status"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      class="hidden-lg-and-down"
      type="hidden-lg-and-down"
      hidden-lg-and-down
      prop="sent"
      label="Sent"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      class="hidden-lg-and-down"
      type="hidden-lg-and-down"
      hidden-lg-and-down
      prop="recepient"
      label="Recepient"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="send"
      label="Send"
      :formatter="formatter"
      width="150">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
import { MessageBox } from 'element-ui';
import axios from 'axios';

console.log("creating axios");
var instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 2000,
});

  export default {
    name: 'InventoryTable',
    props: ['getSelectedItem',
            'authtoken'],
    data() {
      return {
        selectedItem: '',
        tableData: [],
      }
    },
    created: function() {
      console.log(this.authtoken);
      console.log('created');
      instance.get('/codes', {headers: {Authorization: this.authtoken}})
        .then((res) => {
          this.tableData = res.data;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    methods: {
      // openSendPrompt() {
      //   const h = this.$createElement;
      //   this.$msgbox({
      //     title: "Send",
      //     message: "he;;p",
      //     showCancelButton: true,
      //     confirmButtonText: 'OK',
      //     cancelButtonText: 'Cancel',
      //   }).then(console.log);
      // },
      showSendOtions(item) {
        this.selectedItem = item;
        this.getSelectedItem(item);
      },
      selectItem(item) {
        console.log(item);
        this.getSelectedItem(item);
      },
      formatter(row, column) {
        return <i class="el-icon-message"></i>
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>