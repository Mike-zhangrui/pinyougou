export default {
  data() {
    return {
      // 角色列表数据
       roleList:[],
      // 控制分配权限对话框的展示和隐藏
       isShowRightsDialog : false,
       // 权限树形数据
       rightsTree:[],
       defaultProps:{
         children:'children',
         label:'authName'
       },
      // 当前角色id
      curRoleId:-1
    }

  },
  created() {
    this.getRoleList()
    this.getRightsTree()
  },
  methods:{
    // 获取角色列表数据
    async getRoleList() {
      const res = await this.$http.get('/roles')
      console.log(res)
      this.roleList  = res.data.data
    },
    showRightsDialog(curRole) {
      this.isShowRightsDialog = true
      this.curRoleId = curRole.id
      const checkedKeys = []
      //  打开对话框，应该选中当前角色拥有的权限
      // 获取到所有的叶子节点
      // 遍历一级节点
      console.log(curRole.children)
      curRole.children.forEach(level1 => {
        // 遍历二级节点
        level1.children.forEach(level2 => {
          // 遍历三级
          level2.children.forEach(level3 =>{
            checkedKeys.push(level3.id)
          })
        });
      });
    this.$nextTick(() =>{
      this.$refs.tree.setCheckedKeys(checkedKeys)
    })
    },
    // 获取权限列表tree结构
    async getRightsTree () {
      const res = await this.$http.get('/rights/tree')
      this.rightsTree = res.data.data
    },
   // 给角色分配权限
   async assignRights () {
     const checkedKeys = this.$refs.tree.getCheckedKeys()
     const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
     const allKeys = [...checkedKeys,...halfCheckedKeys]
     const res = await this.$http.post(`/roles/${this.curRoleId}/rights`, {
       rids:allKeys.join(',')
     })
     // 成功后关闭对话框
     this.isShowRightsDialog = false
     // 提示成功
     this.$message({
       type:'success',
       message:res.data.meta.msg
     })
     // c重新获取列表数据
     this.getRoleList()
   },
   // 删除角色指定权限
   async delRights (roleId,rightId) {
     const res =  await this.$http.delete(`/roles/${roleId}/rights/${rightId}`)
     // 提示成功
     this.$message({
       type:'success',
       message:res.data.meta.msg
     })
     this.getRoleList()
   }
  }
}
