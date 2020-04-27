<template>
    <div class="dashboard_box">
        <HeaderBack :title='menuType | titleList'/>
        <div style="margin-top: 10px">
            <div v-show="menuType!=='6'&&menuType!=='8'">
                <el-button @click="goCreate" style="float: right;margin: 10px 0px 10px 0" type="primary">创建</el-button>
            </div>
            <el-table
                    v-show="menuType==='8'"
                    :data="watchData"
                    style="width: 100%">
                <el-table-column
                        label="序号">
                    <template slot-scope="scope">
                        <p>{{scope.$index + 1}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="姓名">
                    <template slot-scope="scope">
                        <p>{{scope.row.name}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="邮箱">
                    <template slot-scope="scope">
                        <p>{{scope.row.userid}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="转发&分享次数">
                    <template slot-scope="scope">
                        <p>{{scope.row.count}}</p>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                    v-show="menuType!=='8'"
                    :data="tableData"
                    :border="true"
                    :show-overflow-tooltip="true"
                    align="center"
                    style="width: 100%">
                <el-table-column
                        label="序号">
                    <template slot-scope="scope">
                        <p>{{scope.$index + 1}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="menuType!=='1' && menuType!=='7' && menuType!=='4' && menuType!=='5'"
                        label="姓名">
                    <template slot-scope="scope">
                        <p>{{scope.row.name | namedddd}}</p>
                    </template>
                </el-table-column>

                <el-table-column
                        v-if="menuType === '2' || menuType === '3' || menuType === '5'"
                        label="标题">
                    <template slot-scope="scope">
                        <p>{{scope.row.title}}</p>
                    </template>
                </el-table-column>

                <el-table-column
                        v-if="menuType === '5'"
                        label="文章地址">
                    <template slot-scope="scope">
                        <p>{{scope.row.title}}</p>
                    </template>
                </el-table-column>

                <el-table-column
                        label="图片">
                    <template slot-scope="scope">
                        <span v-if="scope.row.image===''">纯文字类型</span>
                        <span v-else @click="setImg(scope.row.image)" style="cursor: pointer">查看</span>
                    </template>
                </el-table-column>

                <el-table-column
                        v-if="menuType==='1'||menuType==='7'"
                        label="视频">
                    <template slot-scope="scope">
                        <span @click="setVideo(scope.row.title)" style="cursor: pointer">查看</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :show-overflow-tooltip="true"
                        v-if="menuType === '1' || menuType === '2' || menuType === '3' || menuType==='7'"
                        label="介绍">
                    <template slot-scope="scope">
                        <p>{{scope.row.content}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                v-show="menuType!=='6'&&menuType!=='4'"
                                size="mini"
                                @click="update(scope.row.id)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog
                    title="预览"
                    :visible.sync="dialogVisible"
                    :before-close="handleClose"
                    width="50%">
                <div class="imgList">
                    <img :src="imgUrl" alt="">
                </div>
                <div v-if="menuType==='4'" v-for="item in imgList" class="imgList">
                    <img :src="item" alt="">
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import HeaderBack from '../common/title-back';
    import http from '../../utils/request'
    import { Api } from '../../api/api'

    export default {
        name: 'dashboard',
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
                        return '合规代言人资源管理'
                    case '2':
                        return '群雄争霸资源管理'
                    case '3':
                        return '人中豪杰资源管理'
                    case '4':
                        return '精彩回顾资源管理'
                    case '5':
                        return '合规锦囊资源管理'
                    case '6':
                        return '承诺书查看'
                    case '7':
                        return '合规云课堂资源管理'
                    case '8':
                        return '转发&分享统计'
                    default:
                        return '您输入的地址错误，此模块功能还未开发'
                }
            }
        },
        data() {
            return {
                watchData: [],
                imgList: [],
                imgUrl: '',
                dialogVisible: false,
                menuType: this.$route.params.type,
                listType: 0,
                tableData2: [],
                tableData: []
            };
        },
        watch: {
            '$route' (to, from) {
                this.menuType = this.$route.params.type
                if (this.menuType !== '8') {
                    this.getListType()
                    this.getList()
                } else {
                    this.watchList()
                }
            }
        },
        components: {
            Schart,
            HeaderBack
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created() {
            if (this.menuType !== '8') {
                this.getListType()
                this.getList()
            } else {
                this.watchList()
            }
        },
        methods: {
            watchList() {
              http.get(Api.watchList).then(res => {
                  this.watchData = res.data
              })
            },
            update(id) {
                this.$router.push({path: `/create/${this.menuType}/${id}`})
            },
            handleDelete(id) {
                http.get(Api.delete + id).then(res => {
                    if (res.code === 0) {
                        this.getList()
                    }
                })
            },
            setVideo(url) {
               window.open(url)
            },
            setImg(url) {
                this.dialogVisible = true
                if (this.menuType === '4') {
                    this.imgList = url.split(',')
                } else {
                    this.imgUrl = url
                }
            },
            handleClose() {
                this.dialogVisible = false
                this.imgList = []
            },
            getListType() {
                switch (this.menuType) {
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
                    case '6':
                        this.listType = 6
                        break
                    case '7':
                        this.listType = 7
                }
            },
            getList() {
                http.get(Api.getActivityList + this.listType).then(res => {
                    this.tableData = res.data
                })
            },
            goCreate() {
                this.$router.push({path: `/create/${this.menuType}`})
            }
        }
    };
</script>


<style scoped>
    .imgList {
        width: 100%;
        overflow: hidden;
        text-align: center;
    }
    .imgList img {
        max-width: 100%;
    }
    .dashboard_box {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 20px;
    }
</style>
