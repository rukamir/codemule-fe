<template>
  <div>
    <div v-if="this.alert.error != null">
      <el-alert
        v-if="!this.alert.error"
        :title="this.alert.message"
        type="success" />
      <el-alert
        v-if="this.alert.error"
        :title="this.alert.message"
        type="error" />
    </div>
    <el-row>
      <el-col 
            :xs="{span:16, offset:4}"
            :sm="{span:16, offset:4}" 
            :md="{span:16, offset:4}">
            <el-button
            v-on:click=this.clearSelected type="" plain>Cancel</el-button>
            <el-button
            v-on:click=this.sendUpdated type="success" plain>Save</el-button>
        <h2>Display{{ this.selected.voucherId }}</h2>
        <!-- <span v-if="this.voucher.filename" ref="putImageHere"></span> -->
        <el-form ref="selected" :model="this.selected" label-width="120px">
          <el-form-item label="Title">
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
          <el-form-item label="Sent Date">
            <div class="block">
              <el-date-picker
                @change=setStatusIfSent
                v-model="selected.sent"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
                type="date"
                placeholder="Pick a day">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="Status">
            <el-select v-model="selected.status" clearable placeholder="Select">
              <el-option
                v-for="item in ['sent']"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Recipient">
            <el-input
              v-model="selected.recipient">
            </el-input>
          </el-form-item>
          <el-form-item label="Expiration">
            <div class="block">
              <el-date-picker
                @change=setStatusIfExpired
                v-model="selected.expiration"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
                type="date"
                placeholder="Pick a day">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="Added">
            <el-input
              v-model="selected.added"
              :disabled="true">
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
      alert: {
        message: null,
        error: null,
      },
      options: {
        status: ['sent']
      },
    };
  },
  created: function() {
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
    sendUpdated() {
      axios.put(`/code/${this.voucher.id}`, this.selected)
        .then((res) => {
          console.log(res.status);
          switch (res.status) {
            case 201:
              this.alert = {
                message: 'Voucher updated.',
                error: false,
              };
              break;
            case 400:
              this.alert = {
                message: 'Request could not be processed at this time.',
                error: true,
              };
              break;
            default:
              this.alert = {
                message: 'Something went wrong',
                error: true,
              };
          };
        })
        .catch((err) => {
          console.log(err);
          this.alert = {
                message: 'Something went wrong',
                error: true,
              };
        });
    },
    setStatusIfSent() {
      this.selected.status = this.selected.sent != null ? 'sent' : null;
    },
    setStatusIfExpired() {
      this.selected.status = this.selected.expiration < new Date()
        && this.selected.sent == null
       ? 'expired' : this.selected.status;
    },
    // form validation needed
    //  - do not allow expiration data prior to today with any status other than expired
    //  - only allow status to be manually set to sent or null
    //  - only display dates as yyyy-mm-dd
    //  - clear filename if image deleted
    // mark required fields
  },
}
</script>