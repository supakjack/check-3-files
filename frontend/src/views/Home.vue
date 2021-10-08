<template>
  <div>
    <vs-row vs-justify="center" class="mt-5">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="6"
        class="p-3"
      >
        <CardTextarea
          title="วางข้อความไฟล์ BILLTRAN"
          height="300px"
          label="วางข้อความไฟล์ BILLTRAN ลงที่นี้"
          @eventTextarea="(value) => (textarea_billtran = value)"
        />
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="6"
        class="p-3"
      >
        <CardTextarea
          title="วางข้อความไฟล์ OPSERVICES"
          height="300px"
          label="วางข้อความไฟล์ OPSERVICES ลงที่นี้"
          @eventTextarea="(value) => (textarea_opservice = value)"
        />
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="12"
        class="p-3"
      >
        <vs-card>
          <div slot="header">
            <div class="flex justify-between">
              <span class="text-xl">ผลลัพธ์ประมวลผลไฟล์ OPSERVICES ใหม่</span>
              <div class="">
                <vs-button
                  @click="onClickProcessLine"
                  color="danger"
                  type="filled"
                  >คลิกเพื่อตรวจสอบ</vs-button
                >
                <vs-button @click="copyText" color="success" type="filled"
                  >คลิกเพื่อคัดลอก</vs-button
                >
              </div>
            </div>
          </div>
          <div>
            <div>
              <vs-textarea
                height="300px"
                :readonly="true"
                label="ดูผลลัพธ์ประมวลผลไฟล์ OPSERVICES ใหม่ที่นี้ "
                v-model="textarea_result"
              />
            </div>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import convert from "xml-js";
import CardTextarea from "./../components/CardTextarea.vue";
export default {
  name: "LinedTextarea",
  components: {
    CardTextarea,
  },
  mounted() {
    this.textarea_opservice = "";
    this.textarea_opservice_json = {};
    this.textarea_billtran = "";
    this.textarea_billtran_json = {};
    this.find_billtran_b = [];
    this.arr_OPServices = [];
  },
  data() {
    return {
      textarea_result: "",
      textarea_opservice: "",
      textarea_billtran: "",
      find_billtran_b: [],
      arr_OPServices: [],
      textarea_opservice_json: {},
      textarea_billtran_json: {},
      activeConfirm: false,
    };
  },
  methods: {
    copyText() {
      this.$copyText(this.textarea_result).then(
        function(e) {
          alert("Copied");
          console.log(e);
        },
        function(e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    },
    async onClickProcessLine() {
      this.textarea_billtran_json = JSON.parse(
        convert.xml2json(this.textarea_billtran, { compact: true, spaces: 4 })
      );
      const arr_BillItems = this.textarea_billtran_json.ClaimRec.BillItems._text.split(
        /\r?\n/
      );

      this.find_billtran_b = await arr_BillItems.filter((row) => {
        const columns = row.split("|");
        if (columns[2] == "B") {
          return row;
        }
      });

      this.textarea_opservice_json = JSON.parse(
        convert.xml2json(this.textarea_opservice, { compact: true, spaces: 4 })
      );
      this.arr_OPServices = this.textarea_opservice_json.ClaimRec.OPServices._text.split(
        /\r?\n/
      );

      // create new OPServices._text with condition
      const new_arr_OPServices = [];
      this.arr_OPServices.map((OPService) => {
        new_arr_OPServices.push(OPService);
        this.find_billtran_b.map((b) => {
          let columns = b.split("|");
          if (OPService.includes(columns[0])) {
            const word = columns[3];
            const cost = columns[11];
            const OPService_columns = OPService.split("|");
            columns = OPService_columns;
            columns[2] = "OP";
            columns[1] = OPService_columns[1];
            console.log(word);
            columns[3] = OPService_columns[3];
            columns[15] = word;
            columns[16] = "IN";
            columns[17] = cost;
            new_arr_OPServices.push(columns.join("|"));
          }
        });
      });

      // assignt to results textarea variable
      this.textarea_result = this.textarea_opservice_json;
      this.arr_OPServices = new_arr_OPServices;

      this.textarea_result.ClaimRec.OPServices._text = "";
      this.arr_OPServices.map((op) => {
        this.textarea_result.ClaimRec.OPServices._text =
          this.textarea_result.ClaimRec.OPServices._text + op + "\n";
      });

      // convert to string to results textarea
      const result = convert.json2xml(this.textarea_result, {
        compact: true,
        spaces: 1,
      });
      this.textarea_result = result;
    },
  },
};
</script>

<style scoped></style>
