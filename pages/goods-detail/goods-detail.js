import {GoodsModel} from '../../model/GoodsModel.js'
import {ThemeModel} from "../../model/ThemeModel"

let goods = new GoodsModel()
let theme = new ThemeModel()

Page({
    data: {
        imageUrl: ''
    },

    onLoad: function (options) {
        this.data.id = options.id
        this._loadData()
    },

    _loadData() {
        // 加载商品数据
        // id为0代表新增商品
        if (this.data.id != 0) {
            let url = 'oldGoods/'
            if (wx.getStorageSync('type') == 'shop') {
                url = 'newGoods/'
            }

            goods.getGoodsDetail(url + this.data.id, (res) => {
                this.setData({
                    id: id,
                    info: res,
                    imageUrl: res.image_id.image_url,
                    imageID: res.image_id.id
                })
            })
        }

        theme.getThemes( (res) => {
            // 保存theme原始变量
            this.theme = res
            // 创建picker可用的数组
            let themeNameArr = []
            for(let item of res){
                themeNameArr.push(item.name)
            }
            this.setData({
                theme: themeNameArr
            })
        })
    },

    themePicker(event){
        let index = event.detail.value
        let value = this.data.theme[index]
        let selectedThemeID = this._getIDByValue(this.theme, value)
        console.log(selectedThemeID)
    },

    _getIDByValue(obj, value){
        let id = -1
        for(let item of obj){
            if(item.name === value){
                id = item.id
            }
        }
        return id
    },

    // 上传图片
    uploadImage(event) {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            success(res) {
                wx.uploadFile({
                    url: goods.baseUrl + 'image/goods',
                    filePath: res.tempFilePaths[0],
                    name: 'image',
                    header: {
                        token: wx.getStorageSync('token')
                    },
                    success(data) {
                        let jsonData = JSON.parse(data.data)
                        that.setData({
                            imageID: jsonData.data.image_id,
                            imageUrl: res.tempFilePaths[0]
                        })
                    }
                })
            }
        })
    },

    submit(event) {
        let data = event.detail.value
        data.image_id = this.data.imageID

        if (this.data.id) {
            // 修改商品信息
            data.id = this.data.id
            goods.editGoods(data, (res) => {
                wx.setStorageSync('newGoods', true)
                wx.showModal({
                    title: '成功',
                    content: '修改商品信息成功',
                    showCancel: false,
                    success() {
                        wx.navigateBack({})
                    }
                })
            }, (res) => {
                wx.showModal({
                    title: '失败',
                    showCancel: false,
                    content: res.message
                })
            })
        } else {
            // 添加商品
            goods.addGoods(data, (res) => {
                wx.setStorageSync('newGoods', true)
                wx.showModal({
                    title: '成功',
                    showCancel: false,
                    content: '添加商品成功',
                    success() {
                        wx.navigateBack({})
                    }
                })
            }, (res) => {
                wx.showModal({
                    title: '失败',
                    showCancel: false,
                    content: res.message
                })
            })
        }
    }
})