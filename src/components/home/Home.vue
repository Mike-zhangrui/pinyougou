<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header class="home-header">
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <img src="@/assets/imgs/logo.png" alt>
        </el-col>
        <el-col>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="6">
          <div>
            欢迎上海前端31期星耀会员
            <a href="javascript:;" class="logout" @click="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="home-aside">
        <el-menu
          :default-active="activePath"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :unique-opened="true"
        >
           <el-submenu :index=" level1.order + '' " v-for="level1 in menus" :key="level1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{level1.authName}}</span>
            </template>

            <el-menu-item
            :index="'/'+ level2.path"
            v-for="level2 in level1.children"
            :key="level2.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ level2.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 主内容区 -->
      <el-main>
        <!-- 子路由出口：-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
      return {
        menus:[]
      }
  },
  created() {
    console.log('路由对象：',this.$router)
    this.getMenuList()
  },
  computed:{
    // 获取需要高亮的哈希值
    activePath  () {
      const { path } = this.$route
      const  pathArr = path.split('/')
      return pathArr.length === 3 ? '/' + pathArr[1] : path
    }
  },
  methods: {
    // 获取菜单
    async getMenuList () {
       const res = await this.$http.get('/menus')
       this.menus =  res.data.data
    },
    // 退出功能
    async logout() {
      try {
        await this.$confirm("您是否确定退出", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        // 退出登录逻辑
        this.$router.push("/login");
        localStorage.removeItem("token");
      } catch (e) {
        this.$message({
          type: "info",
          message: "已取消退出"
        });
      }
    }
  }
};
</script>
<style>
.home-container {
  height: 100%;
  background-color: #eaeef1;
}
.home-header {
  background-color: #b3c1cd;
}
.home-header img {
  width: 200px;
}
.home-header h1 {
  margin: 0;
  text-align: center;
  color: #fff;
  font-size: 28px;
  font-weight: bolder;
}
.home-header div {
  min-width: 235px;
  font-weight: bold;
}
.home-header .logout {
  color: red;
}
.home-aside {
  background-color: #545c64;
}
.el-header {
  padding-left: 0;
}
</style>

