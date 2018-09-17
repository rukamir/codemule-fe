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
    <el-pagination
      layout="prev, pager, next, sizes"
      @current-change="getPageData"
      @size-change="handleSizeChange"
      :current-page.sync="page"
      :page-sizes="[1, 2, 3]"
      :total="totalCount"
    />
  </div>
</template>

<script>
// import 'element-ui/lib/theme-chalk/display.css';
import { MessageBox } from 'element-ui';
import axios from '../../services/axios';

  export default {
    name: 'SendList',
    props: ['getSelectedItem'],
    data() {
      return {
        selectedItem: '',
        tableSize: 10,
        totalCount: 0,
        page: 1,
        tableData: [],
      }
    },
    created: function() {
      console.log('calling');
      axios.get('/codes/unique/count')
        .then((res) => {
          console.log('unqiue total count', res);
          this.totalCount = res.data[0].total;
        })
        .catch((err) => {
          console.log(err);
        });

      axios.get('/codes/unique')
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
      handleSizeChange(val) {
        this.tableSize = val;
      },
      getPageData() {
        console.log('data will be calleds', this.page);
        axios.get(`/codes/unique?page=${this.page}&count=${this.tableSize}`)
          .then((res) => {
            console.log(this.tableData);
            this.tableData = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
  }
</script>