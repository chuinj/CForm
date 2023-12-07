<template>
  <div>
    <component :is="`el-select`" :v-on="">
      <slot></slot>
    </component>
    <CForm>
      <el-button type="text" slot="prefix">哈哈</el-button>
      <el-button type="text" slot="suffix">哈哈</el-button>

      <el-button type="text" slot="prepend">哈哈</el-button>
      <el-button type="text" slot="append">哈哈</el-button>

      <el-button type="text" slot="upload">哈哈</el-button>
    </CForm>
    <formCom></formCom>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
