<template>
  <vs-card>
    <div slot="header">
      <div class="flex justify-between">
        <span class="text-xl">{{ title }}</span>
        <vs-button @click="textarea = ''" color="danger" type="filled"
          >คลิกเพื่อล้างข้อความ</vs-button
        >
      </div>
    </div>
    <div>
      <div>
        <vs-textarea
          :height="height"
          :label="label"
          v-model="textarea"
          @change="$emit('eventTextarea', textarea)"
        />
      </div>
    </div>
  </vs-card>
</template>

<script>
export default {
  name: 'Check3FilesCardtextarea',

  props: ['height', 'label', 'title'],
  data() {
    return {
      textarea: ''
    }
  },
  mounted() {},

  methods: {}
}
</script>

<style lang="css" scoped></style>
