<template>
    <div class="create_box">
        <TitleBack :title="createType | titleList"></TitleBack>
        <div class="create_content">
            <div class="form_box">
                <el-form ref="form" :model="form" label-width="80px">
                    <div v-show="createType==='2'||createType==='3'||createType==='5'">
                        <el-form-item label="标题">
                            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                        </el-form-item>
                    </div>

                    <div v-show="createType==='5'">
                        <el-form-item label="文章连接">
                            <el-input v-model="form.name" placeholder="请输入文章连接"></el-input>
                        </el-form-item>
                    </div>

                    <div v-show="createType==='5'">
                        <el-form-item label="锦囊日期">
                            <el-input v-model="form.content" placeholder="请输入日期，例：2020年2月15日"></el-input>
                        </el-form-item>
                    </div>

                    <div v-show="createType==='2'||createType==='3'">
                        <el-form-item label="姓名">
                            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </div>

                    <div v-show="createType<4 || createType==='5' || createType==='7'" class="avatar-uploader_box">
                        <el-form-item label="封面图">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="upload"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="imgurl" :src="imgurl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>

                    <div v-show="createType==='4'">
                        <el-form-item label="图片">
                            <el-upload
                                    :limit="10"
                                    :multiple="true"
                                    class="upload-demo"
                                    :action="upload"
                                    :on-success="handleAvatarSuccess2"
                                    :file-list="fileVideoList"
                                    :before-upload="beforeAvatarUpload"
                                    :on-exceed="handleExceed"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gig文件，且不超过10M,一次最多可选10张上传</div>
                            </el-upload>
                        </el-form-item>
                    </div>

                    <div v-show="createType==='1' || createType==='3' ||createType==='7'">
                        <el-form-item label="视频">
                            <div class="video_box">
                                <el-upload
                                        :on-success="fileSuccess"
                                        class="upload-demo"
                                        :action="upload"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        multiple
                                        :limit="filesLength"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <!--                                <div slot="tip" class="el-upload__tip">只能上传视频文件</div>-->
                                </el-upload>
                            </div>
                        </el-form-item>
                    </div>

                    <div v-show="createType==='1' || createType==='2' || createType==='7' || createType==='3'">
                        <el-form-item label="介绍">
                            <el-input
                                    type="textarea"
                                    :rows="12"
                                    placeholder="请输入内容"
                                    v-model="form.content">
                            </el-input>
                        </el-form-item>
                    </div>

                    <el-form-item>
                        <el-button v-show="!activityId" type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button v-show="activityId" type="primary" @click="updateActivity">保存编辑</el-button>
                        <el-button @click="$router.back()">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import http from '../../api/index'
    import { Api } from '../../api/api'
    import TitleBack from '../common/title-back'
    export default {
      props: {
        dialogVisible: {
          type: Boolean,
          default: false
        }
      },
    filters: {
        namedddd (item) {
            if (item) {
                item = item.split('$分割$')[0]
            }
            return item
        },
        titleList (type) {
            switch (type) {
                case '1':
                    return '创建合规代言人资源'
                case '2':
                    return '创建群雄争霸资源'
                case '3':
                    return '创建人中豪杰资源'
                case '4':
                    return '创建精彩回顾资源'
                case '5':
                    return '创建合规锦囊资源'
                case '7':
                    return '创建合规云课堂'
                default:
                    return '您输入的地址错误，此模块功能还未开发'
            }
        }
    },
      data() {
        return {
            mp4url: '',
            imgurl: '',
            activityId: this.$route.params.id,
            listType: 0,
            fileVideoList: [],
            filesLength: this.$route.params.type === '1' ? 1 : 10,
            imgList: [],
            createType: this.$route.params.type,
            upload: Api.uploadFile,
            fileList: [],
            form: {
                title: '',
                content: '',
                name: '',
                imageUrl: ''
            }
        }
      },
      created: function () {
          this.getListType()
          if (this.activityId) {
              this.getActivityInfo()
          }
      },
      methods: {
          getActivityInfo () {
              http.get(Api.activityInfo + this.activityId).then(res => {
                  res.data.name = res.data.name.split('$分割$')[0]
                  this.form = res.data
                  this.form.imageUrl = res.data.image
                  this.imgurl = res.data.image
              })
          },
          getListType() {
              switch (this.createType) {
                  case '1':
                      this.listType = 3
                      break
                  case '2':
                      this.listType = 1
                      break
                  case '3':
                      this.listType = 2
                      break
                  case '4':
                      this.listType = 4
                      break
                  case '5':
                      this.listType = 5
                      break
                  case '7':
                      this.listType = 7
                      break
              }
          },
          fileSuccess(response, file, fileList) {
              if (this.createType === '1' || this.createType === '7') {
                  this.form.title = response.data
              }
              if (this.createType === '3') {
                  this.mp4url = response.data
              }
          },
          handleRemove(file, fileList) {
              console.log(file, fileList);
          },
          handlePreview(file) {
              console.log(file);
          },
          handleExceed(files, fileList) {
              this.$message.warning(`当前限制选择 ${ this.filesLength } 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
          },
          beforeRemove(file, fileList) {
              return this.$confirm(`确定移除 ${ file.name }？`);
          },
          handleAvatarSuccess(res, file) {
              this.imgurl = res.data
              this.form.imageUrl = res.data;
          },
          handleAvatarSuccess2(res, file, list) {
              this.imgList.push(res.data)
          },
          beforeAvatarUpload(file) {
              const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif'

              let isLt2M = file.size / 1024 / 1024 < 6;
              if (this.createType === '1') {
                  isLt2M = file.size / 1024 / 1024 < 600;
              }

              if (this.createType !== '1' && !isJPG) {
                  this.$message.error('上传头像图片只能是 JPG、PNG、GIF 格式!');
              }
              if (!isLt2M) {
                  if (this.createType === '1') {
                      this.$message.error('上传视频大小不能超过 100MB!');
                  } else {
                      this.$message.error('上传精彩回顾图片大小不能超过 10MB!');
                  }
              }
              return isJPG && isLt2M;
          },
          updateActivity() {
              let params = {
                  id: this.activityId,
                  type: this.listType,
                  title: this.form.title,
                  name: this.form.name,
                  image: this.form.imageUrl,
                  content: this.form.content,
                  contenttype: 1
              }
              if (this.createType === '4') {
                  params.image = this.imgList.toString()
              }
              if (this.createType === '3') {
                  if (this.mp4url !== '') {
                      params.name = params.name + '$分割$' + this.mp4url
                  }
              }
              http.post(Api.updateActivity, params).then(res => {
                  if (res.code === 0) {
                      this.$message.success('编辑成功');
                      this.$router.back()
                  }
              }).catch(error => {
                  alert(error.message)
              })
          },
          onSubmit() {
              // type 1.群雄争霸2.人中豪杰3.合规代言人
              // contenttype 1.文章2.图片3.视频
              let params = {
                  type: this.listType,
                  title: this.form.title,
                  name: this.form.name,
                  image: this.form.imageUrl,
                  content: this.form.content,
                  contenttype: 1
              }
              if (this.createType === '4') {
                  params.image = this.imgList.toString()
              }
              if (this.createType === '3') {
                  params.name = params.name + '$分割$' + this.mp4url
              }
              http.post(Api.activitySave, params).then(res => {
                  if (res.code === 0) {
                      this.$message.success('创建成功');
                      this.$router.back()
                  }
              }).catch(error => {
                  alert(error.message)
              })
          }
      },
      components: {
          TitleBack
      }
    }
</script>
<style>
    .video_box .el-upload--text {
        width: auto;
        height: auto;
        border: none;
        text-align: center !important;
    }
    .avatar {
        width: auto !important;
        height: 100% !important;
    }
    /*.avatar-uploader_box*/
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        text-align: center !important;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
</style>
<style scoped>
    .form_box {
        width: 500px;
    }
    .create_content {
        width: 100%;
        margin-top: 20px;
        background: #ffffff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 20px;
    }
    .create_box {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 20px;
    }
</style>
