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
        type="error" />`
    </div>
    <el-row>
      <el-col>
        <el-form v-if="!this.sent" :model="recipient" :inline="true" class="demo-form-inline">
          <el-form-item label="Send to:">
            <el-input v-model="recipient.address" placeholder="address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="send">Send</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="cancel">Cancel</el-button>
          </el-form-item>
        </el-form>
        <h2 v-if="this.error != null">Error sending <i class="el-icon-error" /></h2>
        <h2 v-else-if="this.sent">Sent to {{ this.recipient.address }} <i class="el-icon-success" /> <el-button @click=this.cancel type="primary">Send Another</el-button></h2>

      </el-col>
      <el-col>

      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="{span:10, offset:8}"
        :sm="{span:10, offset:8}" 
        :md="{span:10, offset:8}">
        <h2>hi</h2>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span v-text="this.activeItem.title" />
            <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
          </div>
          <div v-for="item in generateDisplayList()" :key="item.id">
            <el-row>
              <el-col
                :xs="{span:6}"
                :sm="{span:6}" 
                :md="{span:6}">
                <div v-text="item.label" class="text item" />
              </el-col>
              <el-col
                :xs="{span:18}"
                :sm="{span:18}" 
                :md="{span:18}">
                <div v-text="item.value" class="text item" />
              </el-col>
            </el-row>
          </div>
        </el-card>
          </el-col>
    </el-row>
  </div>
</template>


<script>
import axios from '../../services/axios';

export default {
  name: "SendDisplay",
  props: ['title',
          'getSelectedItem'],
  data() {
    return {
      recipient: { address: "" },
      activeItem: null,
      sent: false,
      error: null,
      alert: {
        error: null,
        message: null,
      },
    };
  },
  created: function() {
    axios.get(`/code/${this.title}/single`)
      .then((res) => {
        this.activeItem = res.data[0];
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    generateDisplayList() {
      return [
        { label: "Title", value: this.activeItem.title },
        { label: "Description", value: this.activeItem.description },
        { label: "Expiration", value: this.activeItem.expiration },
        { label: "Unique", value: this.activeItem.unqiue ? "True": "False" },
        { label: "Filename", value: this.activeItem.filename },
      ];
    },
    send() {
      console.log(`sending ${this.activeItem.title}`);
      this.sent = true;
      axios.put(`/send/${this.activeItem.id}`, { recipient: this.recipient.address })
        .then((res) => {
          switch (res.status) {
            case 204:
              this.alert = {
                error: false,
                message: "Voucher is being sent.",
              };
              break;
            case 400:
              this.alert = {
                error: true,
                message: "This request could not be processed at this time.",
              };
              break;
            default:
              this.alert = {
                error: true,
                message: "Something went wrong",
              };
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.getSelectedItem(null);
    },
  },
}
</script>