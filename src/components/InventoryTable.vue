<template>
  <div>
    <el-table
    :data="tableData"
    offset="2"
    @row-click=showSendOtions>
    <el-table-column
      sortable
      prop="title"
      label="Title">
    </el-table-column>
    <el-table-column
      prop="count"
      label="Count"
      width="100"
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

  export default {
    name: 'InventoryTable',
    props: ['getSelectedItem'],
    data() {
      return {
        selectedItem: '',
        tableData: [{
          id: 1,
          added: '2016-05-03',
          title: 'Tom',
          address: 'Tank Engine Plt9 3/4',
          count: 9,
          tag: 'Home'
        }, {
          id: 2,
          added: '2016-05-02',
          title: 'Alice',
          address: '109 Wonderland Ave',
          count: 1,
          tag: 'Office'
        }, {
          id: 3,
          added: '2016-05-04',
          title: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          count: 4,
          tag: 'Home'
        }, {
          id: 4,
          added: '2016-05-01',
          title: 'Peter',
          address: 'No. 189, Grove St, Los Angeles',
          count: 14,
          tag: 'Office'
        }],
      }
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
      }
    }
  }
</script>