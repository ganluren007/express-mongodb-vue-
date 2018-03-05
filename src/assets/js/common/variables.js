/* 
* @Author: anchen
* @Date:   2017-01-16 14:59:54
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-30 09:49:46
*/

/****************系统常量配置 begin*************************/
//开发
//const HTTP_BASE_PATH = "http://IQSZ-D4652:9091/icp-bbdrive";
//测试环境一
const HTTP_BASE_PATH = "http://localhost:3000";
//测试环境二 
//const HTTP_BASE_PATH = "http://test2-iicp-dmzstg.pingan.com.cn/icp_portal2/icp-bbdrive";
//生产
//const HTTP_BASE_PATH = "/icp_portal/icp-bbdrive";


export const HTTP_JSON = false;//ture:请求json文件；false:请求Java
/****************系统常量配置 END*************************/

/****************请求路径配置 begin*************************/




export const REGISTER = HTTP_BASE_PATH+'/api/user/register';

export const LOGIN = HTTP_BASE_PATH+'/api/user/login';

export const YZTOKEN = HTTP_BASE_PATH+'/api/user/yz_token';


//admin页面
//获取用户名信息
export const GETUSERIFO = HTTP_BASE_PATH+'/admin/getuserifo'

export const GETCATEIFO = HTTP_BASE_PATH+'/admin/getCateifo'

export const ADDCATE = HTTP_BASE_PATH+'/admin/addCate'

export const CHANGECATE = HTTP_BASE_PATH+'/admin/changeCate'

export const DELETCATE = HTTP_BASE_PATH+'/admin/deletCate'


export const GETCONTENTIFO=HTTP_BASE_PATH+'/admin/getContentifo'

export const ADDCONTENT=HTTP_BASE_PATH+'/admin/addContent'

export const CHANGECONTENT=HTTP_BASE_PATH+'/admin/changeContent'

export const GETINDEXIFO=HTTP_BASE_PATH+'/api/index'

export const FINDCATEIFO=HTTP_BASE_PATH+'/api/findCateContent'
/****************请求路径配置 end*************************/
