<template>
  <div>
    <el-row>
      <el-col 
            :xs="{span:16, offset:4}"
            :sm="{span:16, offset:4}" 
            :md="{span:16, offset:4}">
            <el-button
            v-on:click=this.clearSelected type="primary" plain>Primary</el-button>
        <h2>Display{{ this.selected.voucherId }}</h2>
        <!-- <span v-if="this.voucher.filename" ref="putImageHere"></span> -->
        <el-form ref="selected" :model="this.selected" label-width="120px">
          <el-form-item label="Activity name">
            <el-input v-model="selected.title"></el-input>
          </el-form-item>
          <el-form-item label="Code">
            <el-input v-model="selected.code"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="Please input"
              v-model="selected.description">
            </el-input>
          </el-form-item>
          <el-form-item label="Sent">
            <el-input
              v-model="selected.sent"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Status">
            <el-input
              v-model="selected.status"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Recipient">
            <el-input
              v-model="selected.recipient">
            </el-input>
          </el-form-item>
          <el-form-item label="Expiration">
            <el-input
              v-model="selected.experation">
            </el-input>
          </el-form-item>
          <el-form-item label="Added">
            <el-input
              v-model="selected.added">
            </el-input>
          </el-form-item>
          <el-form-item label="File">
            <el-input
              v-model="selected.filename">
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import axios from '../../services/axios';

export default {
  name: "InventoryDisplay",
  props: ['voucher',
          'clearSelected'],
  data() {
    return {
      selected: null,
      img: null,
    };
  },
  created: function() {
    console.log(this.voucher);
    this.selected = this.voucher;
    // axios.instance.get(`/code/${this.voucher.id}/image`)
    //   .then((res) => {
    //     //console.log(res.data);
    //     this.img = res.data;
    //     console.log(`Retreived`);
    //     console.log(this.img);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  methods: {
    getImgUrl() {
      return `http://localhost:3000/code/${this.voucher.id}/image`;
    },
  },
}
</script>