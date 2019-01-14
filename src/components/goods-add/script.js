// 导入富文本编辑器组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 步骤条当前索引号
      active:0,
      // tab栏选中项
      tabActive:'basic',
     // 商品添加数据对象
     goodsAddForm: {
       goods_name:'',
       goods_cat:'',
       goods_price:'',
       goods_number:'',
       goods_weight:'',
       goods_introduce:'',
       // 上传图片文件的临时路径数组
       pics:[],
       // 商品分类选中项数组
       goods_cat_add:[],
       // 是否促销
       is_promote:false
     },
     // 分类列表数据
     cateList:[],
     // 上传文件的请求头
     headers: {
       Authorization:localStorage.getItem('token')
     },
    }
  },
  created() {
    this.getCateList()
  },
  methods:{
    // 获取分类列表数据
    async getCateList () {
       const res = await this.$http.get('/categories',{
         params:{
           type:3
         }
       })
       this.cateList = res.data.data
    },
    // 上传图片成功时的回调函数
    onSuccess (response,file,fileList) {
      this.goodsAddForm.pics.push({
          pic:response.data.tmp_path
      })
    },
    next(active, tabActive){
      this.active = active
      this.tabActive = tabActive
    },
   // tab切换事件
    tabChange(tab) {
       // 通过tab.index 就可以获取到当前组件的索引号
       this.active = tab.index - 0
    },
    async addGoods () {
      const {
        goods_name,
        goods_cat_add,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
        is_promote
      } = this.goodsAddForm
      const res = await this.$http.post('/goods',{
        goods_name,
        goods_cat:goods_cat_add.join(','),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
        is_promote
      })
      // 提示成功

      this.$message({
        type:'success',
        message:res.data.meta.msg
      })
      this.$router.push('/goods')
    }
  }
}
