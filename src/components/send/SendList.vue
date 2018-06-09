<template>
  <div
        :xs="{span:20, offset:4}"
        :sm="{span:20, offset:4}" 
        :md="{span:22, offset:2}">
    <el-row>
      <el-col>
        <el-table
        :data="tableData"
        @row-click=showSendOtions>
          <el-table-column
            sortable
            prop="title"
            label="Title">
          </el-table-column>
          <el-table-column
            prop="count"
            label="Count"
            width="100">
          </el-table-column>
          <el-table-column
            v-if="getWindowWidth() > 900"
            prop="send"
            label="Send"
            :formatter="formatter"
            width="150">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import 'element-ui/lib/theme-chalk/display.css';
import { MessageBox } from 'element-ui';
import axios from 'axios';

var instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 2000
});

  export default {
    name: 'SendList',
    props: ['getSelectedItem',
            'authtoken'],
    data() {
      return {
        selectedItem: '',
        tableData: [{
          title: "Test title",
          count: 5
        }],
      }
    },
    created: function() {
      console.log("Created");
      console.log(this.authtoken);
      instance.get('/codes/unique', {headers: {Authorization: this.authtoken}})
        .then((res) => {
          console.log(this.tableData);
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
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
      formatter(row, column) {
        return <i class="el-icon-message"></i>
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      getWindowWidth() {
        return window.innerWidth
      },
    }
  }
</script>