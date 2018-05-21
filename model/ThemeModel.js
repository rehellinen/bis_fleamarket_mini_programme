/**
 *
 *  Create By rehellinen
 *  Create On 2018/5/21 15:05
 */
import {BaseModel} from "./BaseModel"

export class ThemeModel extends BaseModel{
    constructor(){
        super()
    }

    /**
     * 获取主题信息
     * @param cb 回调函数
     */
    getThemes(cb) {
        let param = {
            url: 'theme',
            callBack: function (data) {
                cb && cb(data);
            }
        }
        this.request(param);
    }

    /**
     * 根据主题ID获取分类
     * @param id 主题ID
     * @param cb 回调函数
     */
    getCategories(id, cb) {
        let params = {
            url: 'category/' + id,
            callBack(res) {
                cb && cb(res)
            }
        }
        this.request(params)
    }
}