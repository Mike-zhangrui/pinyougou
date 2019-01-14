export default {
  data() {
    return {
      // 准备商品数据
      goodsList: [],
      // 当前页
      pagenum: 1,
      // 每页大小
      pagesize: 5,
      // 总条数
      total: 0

    }
  },
  created () {
    const pagenum = this.$route.params.page - 0
    this.getGoodsList(pagenum)
  },
  watch: {
    $route (to,from) {
      const pagenum = to.params.page - 0
      this.getGoodsList(pagenum)
    }
  },
  methods: {
    // 获取商品列表数据
    async getGoodsList(pagenum = 1) {
      const res = await this.$http.get('/goods', {
        params: {
          query: '',
          pagenum,
          pagesize: this.pagesize
        }
      })
      console.log(res)
      const { goods, pagenum:curPage, total } = res.data.data
      this.goodsList = goods
      this.pagenum = curPage - 0
      this.total = total
    },
    // 切换分页
    changePage(curPage) {
      // 浏览器地址栏的哈希值变成当前页对应的哈希值
      this.$router.push(`/goods/${curPage}`)
    }
  }
}
