<template>
  <div>
    <h2>Upload screen is here</h2>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change=GetFile
        :before-remove=ClearFile
        :auto-upload="false">
        <el-button slot="trigger" size="large" type="primary">select file</el-button>
        <el-button style="margin-left: 10px;" size="large" type="success" @click="submitUpload">upload to server</el-button>
        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
      </el-upload>
      <SingleUpload :voucher=voucher />
  </div>
</template>


<script>
import SingleUpload from './SingleUpload';

export default {
  name: "Upload",
  components: {
    SingleUpload,
  },
  data() {
    return {
      file: {},
      voucher: {
      },
    };
  },
  created() {
  },
  methods: {
    GetFile(file, fileList) {
      console.log("on change happened");
      this.file = file;

      var reader = new FileReader ();
      reader.onload = () => {
        // console.log( reader.result );
        this.CSVtoArray(reader.result);
      }
      reader.readAsText(file.raw);
    },
    ClearFile(file, fileList) {
      console.log("remove happened");
      this.file = {};
    },
    submitUpload() {
      console.log('you tried to upload');
    },
    csvStringToObject(string) {
      const fileString = string;
      const csv = fileString.split('\n');
      const headers = csv[0].split(',');
      const rows = csv.splice(1);
      const result = [];

        console.log(rows);
      rows.map((row) => {
        const rowObject = {};
        
        row
          .split(',')
          .forEach((rowValue, i) => rowObject[headers[i]] = rowValue);
        
        result.push(rowObject);
      });
      // console.log(result);
    },
    CSVtoArray(text) {
        var re_valid =  /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value =  /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        console.log(!re_valid.test(text));
        if (!re_valid.test(text)) return null;
        var a = [];                    
        text.replace(re_value,
            function(m0, m1, m2, m3) {
                if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
                else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
                else if (m3 !== undefined) a.push(m3);
                return ''; 
            });
        if (/,\s*$/.test(text)) a.push('');
        console.log('this is a',a);
        debugger
        return a;
    },
  },
}
</script>
