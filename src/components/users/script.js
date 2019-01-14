export default {
  created() {
    this.getUserList();
  },
  data() {
    return {
      //用户列表数据
      userList: [],
      //总条数
      total: 0,
      //当前页
      pagenum: 1,
      //每页大小
      pagesize: 3,
      searchText: "",
      isShowUserAddDialog: false,
      // 添加用户数据
      userAddForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 添加用户的表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "用户名长度为5到12个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6到12个字符", trigger: "blur" }
        ],
        // 邮箱验证
        email: {
          pattern:/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
          message: '邮箱格式不正确',
          trigger: "blur"
        },
        mobile: {
          pattern:/^1(3|4|5|7|8)\d{9}$/,
          message:'手机号格式不正确',
          trigger: "blur"
        }
      },
      // 编辑用户信息
      isShowUserEditDialog: false,
      userEditForm: {
        id:'',
        email:'',
        mobile:'',
        username:''
      }
    };
  },
  methods: {
    async getUserList(pagenum = 1, query = "") {
      const url = "/users";
      const options = {
        params: {
          // 查询条件
          query,
          // 当前页
          pagenum,
          // 每页大小
          pagesize: 3
        }
      };
      // 使用await 等待Promise结果
      const res = await this.$http.get(url, options);
      console.log("用户列表数据: ", res);
      if (res.data.meta.status === 200) {
        // 获取数据成功
        this.userList = res.data.data.users;
        // 设置总条数
        this.total = res.data.data.total;
        // 设置当前页
        this.pagenum = res.data.data.pagenum;
      } else {
        // 失败时
        // 跳回登录页面
        this.$router.push("/login");
        //清除token
        localStorage.removeItem("token");
      }
    },
    // 切换分页，获取当前页数据
    changePage(curPage) {
      this.getUserList(curPage, this.searchText);
    },
    // 切换用户状态
    async changeUserState(user) {
      try {
        // 手动抛出异常
        // throw new Error('报错了')
        const res = await this.$http.put(
          `/users/${user.id}/state/${user.mg_state}`,
          null,
          {}
        );
        if (res.data.meta.status === 200) {
          //表示设置状态成功
          this.$message({
            type: "success",
            message: res.data.meta.msg,
            duration: 1000
          });
        } else {
          // 表示设置用户状态失败
          this.$message({
            type: "warning",
            message: res.data.meta.msg
          });
        }
      } catch (er) {
        this.$message({
          type: "error",
          message: "设置状态失败"
        });
      }
    },
    search() {
      this.getUserList(1, this.searchText);
    },
    ShowUserAddDialog() {
      this.isShowUserAddDialog = true;
    },
    // 添加用户逻辑
    async addUser() {
      try {
        // 先进行表单验证
        await this.$refs.userAddFormRef.validate();
        // 添加用户逻辑
        const res = await this.$http.post("/users", this.userAddForm);
        if (res.data.meta.status === 201) {
          // 关闭对话框
          this.isShowUserAddDialog = false;
          // 提示信息
          this.$message({
            type: "success",
            message: this.data.meta.msg
          });
        }
      } catch (err) {
        // 添加失败  无需操作
      }
    },
    async delUserById(id) {
      // 弹出对话框
      try {
          await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
         // 发送请求，删除数据
         const res = await this.$http.delete(`/users/${id}`)
         if(res.data.meta.status === 200) {
           this.$message({
             type:'success',
             message:res.data.meta.msg
           })
           this.getUserList(1,this.searchText)
         }
         else {
           this.$message({
             type:'warning',
             message:res.data.meta.msg
           })
         }
      } catch (error) {
          this.$message({
             type:'info',
             message:'取消删除'
          })
      }
    },
    ShowEditDialog(userInfo) {
      this.isShowUserEditDialog = true
      for(let key in this.userEditForm) {
        this.userEditForm[key] = userInfo[key]
      }
    },
    // 更新信息
    async updateUser() {
      // 解构赋值
      const {id,email,mobile} = this.userEditForm
      const res = await this.$http.put(`/users/${id}`,{
        email,
        mobile
      })
      // 解构   msg:message 重命名 msg不再使用   使用message
    const { meta:{status,msg:message} } = res.data
    if(status === 200) {
      // 关闭对话框
      this.isShowUserEditDialog = false
      this.$message({
        type:'success',
        message
      })
      // 重新渲染列表
      this.getUserList(this.pagenum,this.searchText)
    }
    },
    hideUserAddDialog() {
      this.$refs.userAddForm.resetFields()
    }

  }
};
