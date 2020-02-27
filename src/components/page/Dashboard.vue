<template>
    <div class="dashboard_box">
        <HeaderBack :title='menuType | titleList'/>
        <div style="margin-top: 10px">
            <div>
                <el-button @click="goCreate" style="float: right;margin: 10px 0px 10px 0" type="primary">创建</el-button>
            </div>
            <el-table
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
                        v-if="menuType!=='1' && menuType!=='4'"
                        label="姓名">
                    <template slot-scope="scope">
                        <p>{{scope.row.name}}</p>
                    </template>
                </el-table-column>

                <el-table-column
                        v-if="menuType === '3'"
                        label="标题">
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
                        v-if="menuType==='1'"
                        label="视频">
                    <template slot-scope="scope">
                        <span @click="setVideo(scope.row.title)" style="cursor: pointer">查看</span>
                    </template>
                </el-table-column>

                <el-table-column
                        v-if="menuType === '1' || menuType === '3'"
                        label="介绍">
                    <template slot-scope="scope">
                        <p>{{scope.row.content}}</p>
                    </template>
                </el-table-column>
<!--                <el-table-column label="操作">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button-->
<!--                                size="mini"-->
<!--                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--                        <el-button-->
<!--                                size="mini"-->
<!--                                type="danger"-->
<!--                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
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
                    default:
                        return '您输入的地址错误，此模块功能还未开发'
                }
            }
        },
        data() {
            return {
                imgList: [],
                imgUrl: '',
                dialogVisible: false,
                menuType: this.$route.params.type,
                listType: 0,
                tableData: []
            };
        },
        watch: {
            '$route' (to, from) {
                this.menuType = this.$route.params.type
                this.getListType()
                this.getList()
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
            this.getListType()
            this.getList()
        },
        methods: {
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
                console.log(this.menuType)
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
