<template>
  <div id="upload-index">
    <h1 class="form-title">文件上传</h1>
    <el-steps :active="activeStep" finish-status="success" simple style="margin-top: 20px">
      <el-step title="填写文件信息"> </el-step>
      <el-step title="上传文件"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <div class="forget-step-box">
      <template v-if="activeStep === 1">
        <keep-alive>
          <div class="form-box">
            <el-form
              ref="user"
              :model="file"
              :rules="rules"
              label-width="150px"
              label-position="top"
            >
              <el-form-item label="文件描述" prop="name">
                <el-input v-model="file.name" style="width: 400px" />
              </el-form-item>
              <el-form-item label="选择文件分类" prop="category">
                <el-select
                  v-model="file.category"
                  placeholder="请选择"
                  style="width: 400px"
                  clearable
                >
                  <el-option
                    v-for="category in categories.categories"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="图片标签添加">
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  type="success"
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput"
                  >+ 标签</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button type="success" style="width: 100%" @click="submitForm">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </keep-alive>
      </template>
      <template v-else-if="activeStep === 2">
        <keep-alive>
          <div class="upload-container">
            <el-upload
              class="upload-box"
              drag
              action="#"
              multiple
              :before-upload="beforeUpload"
              :http-request="requestUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              list-type="picture"
              :file-list="fileList"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传图片，且不超过500kb</div>
            </el-upload>
            <el-button class="upload-btn" @click="submitUpload">上传</el-button>
          </div>
        </keep-alive>
      </template>
      <template v-else>
        <div class="info">图片上传完成&nbsp;<span @click="uploadAgain">继续上传</span></div>
      </template>
    </div>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
import { uploadImages } from '@/api/image'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.user.pwd !== '') {
          this.$refs.user.validateField('pwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.new_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      categories: {
        rows: null,
        count: null,
      },
      //获取用户的id作为图片的外键 即上传人信息
      userId: JSON.parse(localStorage.getItem('userInfo')).id,
      file: {
        name: null,
        category: null,
        dataset: [],
      },
      fileList: [],
      activeStep: 1,
      rules: {
        name: [{ required: true, message: '请输入文件描述', trigger: 'blur' }],
        category: [{ required: true, message: '请选择文件分类', trigger: 'change' }],
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    //本地后去图片分类
    getAllCategories() {
      this.categories = JSON.parse(localStorage.getItem('categories'))
    },
    beforeUpload(file) {
      if (file.type.indexOf('image/') == -1) {
        this.$message.error('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。')
        return
      }
    },
    //提交时做个判断
    submitUpload() {
      if (this.fileList.length === 0) {
        this.$message.warning('请先选择上传文件！')
        return
      }
      this.uploadImg()
    },
    //上传文件详细的api,调用后台接口
    async uploadImg() {
      let categoryInEn
      let formData = new FormData()
      this.fileList.forEach((file) => {
        formData.append('multipleFiles', file.raw)
      })
      this.categories.categories.forEach((item) => {
        if (item.id === this.file.category) {
          categoryInEn = item.nameInEn
        }
      })
      const imageObj = {
        name: this.file.name,
        categoryId: this.file.category,
        uploaderId: this.userId,
        categoryPath: categoryInEn,
        tags: this.dynamicTags,
        formDataUUid: formData.getAll('multipleFiles'),
      }
      formData.append('imageObj', JSON.stringify(imageObj))
      const res = await uploadImages(formData)
      this.$message.success('上传成功！')
      this.fileList = []
      this.activeStep = 3
    },
    //该api可以获取到随机生成图片的url和name以便给file-list使用
    handleChange(file, fileList) {
      this.fileList.push({ name: file.name, url: file.url, raw: file.raw })
    },
    //重写事件 防止默认的action处理流程
    requestUpload() {},
    progressUpload(e, file, fileList) {},
    handlePreview(file) {},
    handleRemove(file, fileList) {
      this.fileList.forEach((item, i) => {
        if (item.uid === file.uid) {
          this.fileList.splice(i, 1)
        }
      })
    },
    submitForm() {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.activeStep = 2
        } else {
          return false
        }
      })
    },
    uploadAgain() {
      this.activeStep = 1
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
  components: { Card },
  mounted() {
    this.getAllCategories()
  },
  destroyed() {},
}
</script>

<style lang="scss" scoped>
#upload-index {
  padding: 10px;
}
.form-title {
  color: #3bc66f;
}
.forget-step-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50px 0;
  .input-box {
    width: 50%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    label {
      width: 25%;
    }
    input {
      width: 100%;
      height: 100%;
      outline: none;
      background: rgb(231, 231, 231);
      border: none;
      &:hover {
        border: 1px solid #3bc66f;
        background: #fff;
      }
    }
    .getcode-btn {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1;
      width: 100px;
      height: 100%;
      color: #fff;
      background: #3bc66f;
      &:disabled {
        color: rgb(145, 144, 144);
        background: rgb(200, 200, 200);
      }
    }
  }
}
.info {
  font-size: 35px;
  color: #3bc66f;
  font-weight: 700;
  .loginOut {
    color: #000;
    text-decoration: underline;
    cursor: pointer;
  }
}
.upload-container {
  position: relative;
  .upload-btn {
    position: absolute;
    top: 100%;
    right: -50%;
    z-index: 1000;
  }
}
::v-deep .upload-box {
  .el-upload {
    .el-upload-dragger {
      width: 540px;
      min-width: 360px;
      height: 270px;
      min-width: 180px;

      .el-icon-upload {
        margin: 80px 0 16px;
      }
      .el-upload__text {
        em {
          color: #3bc66f;
        }
      }

      &:hover {
        border-color: #3bc66f;
      }
    }
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
