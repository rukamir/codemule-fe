<template>
  <div>
    <el-form ref="voucher" :model="voucher" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="voucher.title"></el-input>
      </el-form-item>
      <el-autocomplete
        class="inline-input"
        v-model="voucher.title"
        :fetch-suggestions="querySearch"
        placeholder="Please Input"
        :trigger-on-focus="false"
      />
      <el-form-item label="Code">
        <el-input v-model="voucher.code"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="Please input"
          v-model="voucher.description">
        </el-input>
      </el-form-item>
      <el-form-item label="Expiration">
        <div class="block">
          <el-date-picker
            v-model="voucher.expiration"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
            type="date"
            placeholder="Pick a day">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="File Name">
        <el-input
          v-model="voucher.filename">
        </el-input>
        <el-checkbox v-model="voucher.unique" :checked="voucher.unique">Unique</el-checkbox>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-change="GetFile"
          :auto-upload="false">
          <img v-if="voucher.img" :src="voucher.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    margin: auto;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
import axios from '../../services/axios.js';

export default {
  name: "",
  props: [
    'voucher',
  ],
  data() {
    return {
      titleList: [],
    };
  },
  created() {
    axios.get('/codes/unique?count=false')
      .then((data) => {
        console.log('uniques ', data);
        this.titleList = data.data.map((item) => {
          console.log(item);
          return {
            value: item.title,
          };
        })
        console.log(this.titleList);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    beforeAvatarUpload(file, fileList) {
      console.log(file);
    },
    GetFile(file, fileList) {
      console.log(file);
      this.voucher.img = file.raw;
      this.voucher.filename = file.name;
    },
    onSubmit() {
      axios.post('/code', this.voucher)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    querySearch(queryString, cb) {
      const list = this.titleList;
      var results = queryString ? list.filter(this.createFilter(queryString)) : list;
      cb(results);
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
  },
}
</script>

