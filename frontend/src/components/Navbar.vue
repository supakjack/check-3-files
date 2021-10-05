<template>
  <div id="nav">
    <div>
      <vs-navbar v-model="activeItem" class="nabarx">
        <div slot="title">
          <div class="flex">
            <div class="flex-initial ">
              <img src="@/assets/hh-logo.jpeg" style="max-width: 5rem" alt="" />
            </div>
            <div class="flex-initial mt-6">
              <vs-navbar-title>
                <span class="text-2xl">โรงพยาบาลหัวหิน</span>
              </vs-navbar-title>
            </div>
          </div>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Check3FilesNavbar',

  data() {
    return {
      activeItem: ''
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
