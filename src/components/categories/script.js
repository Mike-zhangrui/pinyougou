export default {
  data() {
    return {
      // 分类列表数据
       cateList:[],
      // 总条数
      total:0,
      // 当前页
      pagenum:0,
      // 每页大小
      pagesize:5,
      // 加载中效果
      loading: false,
      isShowCateAddDialog:false,
      cateAddList:[],
      // 添加分类的表单数据

      cateAddForm: {
          // 级联选择器的数据
          catePidArr:[],
          cat_name:''
      }

    }
  },
  created() {
    this.getCateList()
    this.getCateAddList()
  },
  methods: {
    async getCateList (curPage = 1) {
      // 设置加载效果
      this.loading = true
      const res = await this.$http.get('/categories',{
        params: {
          type:3,
          pagenum:curPage,
          pagesize:5
        }
      })
      console.log(res)
      const { result, pagenum, total} = res.data.data
      this.cateList = result
      this.pagenum = pagenum + 1
      this.total = total
      this.loading = false
    },
    // 切换分页
    changePage (curPage) {
      this.getCateList(curPage)
    },
    showCateAddDialog() {
      this.isShowCateAddDialog = true
    },
    async getCateAddList() {
      const res  = await this.$http.get('/categories',{
        params: {
          type:2
        }
      })
      this.cateAddList = res.data.data
    },
    // 添加分类
    async addCate() {
      const { cat_name, catePidArr} = this.cateAddForm
      // console.log(catPidArr[catPidArr.length - 1])
      console.log(this.cateAddForm.catePidArr)
      const res = await this.$http.post('/categories',{
        // 父ID
        cat_pid:catePidArr[catePidArr.length-1],
        cat_name,
        cat_level:catePidArr.length
      })
      this.isShowCateAddDialog = false
      this.$message({
        type:'success',
        message:res.data.meta.msg
      })
      this.getCateList()
    }
  }
}
