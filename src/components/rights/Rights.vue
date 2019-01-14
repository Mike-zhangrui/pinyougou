<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="rightList" stripe style="width: 100%">
      <el-table-column type="index" :index="getIndex" ></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
         <span v-if="scope.row.level === '0'">一级</span>
         <span v-else-if="scope.row.level === '1'">二级</span>
         <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rightList: []
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    getIndex(index) {
      return index;
    },
    async getRightList() {
      const res = await this.$http.get("/rights/list");
      this.rightList = res.data.data;
    }
  }
};
</script>
<style scpoed>
.breadcrumb {
  padding-left: 10px;
  line-height: 50px;
  background-color: #d4dae0;
  font-size: 16px;
}
</style>
