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
      prop="recipient"
      label="Recipient"
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
  <el-pagination
    layout="prev, pager, next, sizes"
    @current-change="getPageData"
    @size-change="handleSizeChange"
    :current-page.sync="page"
    :page-sizes="[5, 10, 20]"
    :total="totalCount"
  />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
import { MessageBox } from 'element-ui';
import axios from '../../services/axios';

  export default {
    name: 'InventoryTable',
    props: ['getSelectedItem',
            'authtoken'],
    data() {
      return {
        selectedItem: '',
        tableSize: 1,
        totalCount: 0,
        page: 1,
        tableData: [],
      }
    },
    created() {
      axios.get('/codes/count')
          .then((res) => {
            this.totalCount = res.data[0].total;
          })
          .catch((err) => {
            console.log(err);
          });
      this.getPageData();
    },
    methods: {
      getPageData() {
        axios.get(`/codes?page=${this.page}&count=${this.tableSize}`)
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleSizeChange(val) {
        this.tableSize = val;
        this.getPageData();
      },
      showSendOtions(item) {
        this.selectedItem = item;
        this.getSelectedItem(item);
      },
      selectItem(item) {
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