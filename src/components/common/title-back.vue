<template>
  <div class="title_back_box">
    <div class="header_back">
      <div>{{title}}</div>
      <el-button @click="$router.back()" plain>返回</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      props: {
        title: {
          type: String,
          default: '未设置标题'
        }
      },
      data() {
        return {}
      },
      created: function () {
      },
      methods: {},
      components: {}
    }
</script>
<style scoped>
.header_back {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 6px;
}
</style>
