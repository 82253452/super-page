import {POST} from "@/utils/Const";

export const LOGIN = `/userLogin/login ${POST}`
export const COMMON_TOKEN = `/common/ypQiniuToken`

export const GET_USER_INFO = `/user/getUserInfo`


export const ORDER_PAGE = `/order/admin/list`

export const CAR_TYPE_PAGE = `/car/list`
export const CAR_TYPE_ADD = `/car/ POST`
export const CAR_TYPE_UPDATE = `/car/ PUT`
export const CAR_TYPE_DEL = (id) => `/car/${id} DELETE`

export const BANNER_PAGE = `/banner/list`
export const BANNER_ADD = `/banner/ POST`
export const BANNER_UPDATE = `/banner/ PUT`
export const BANNER_DEL = (id) => `/banner/${id} DELETE`

export const MINI_APP_PAGE = `/busiApp/selectByPage`
export const BUSI_APP_TEMPLATES = `/busiApp/gettemplatelist`
export const BUSI_APP_DRAFT_TEMPLATE = `/busiApp/addtotemplate`
export const BUSI_APP_TRAFTS = `/busiApp/gettemplatedraftlist`
export const BUSI_APP_DEL_TEMPLATE = `/busiApp/deleteTemplate`
export const BUSI_APP_QR_CODE = `/busiApp/getTestQrcode`


export const MINI_APP_TRAFTS = `/mini/getTrafts`
export const MINI_APP_TEMPLATES = `/mini/getTemplates`
export const MINI_APP_UPLOAD = `/mini/uploadApp`

export const TRANS_COMPANY_PAGE = `/trans/list`
export const TRANS_COMPANY_DETAIL = `/trans/detail`
export const TRANS_COMPANY_ADD = `/trans/ POST`
export const TRANS_COMPANY_UPDATE = `/trans/ PUT`
export const TRANS_COMPANY_DEL = (id) => `/trans/${id} DELETE`


export const TRANS_COMPANY_USER_PAGE = `/transCompanyUser/admin/list`
export const TRANS_COMPANY_USER_CHECK_USER = `/transCompanyUser/checkUser`
export const TRANS_COMPANY_USER_DEL = (id) => `/transCompanyUser/${id} DELETE`


export const COMPANY_PAGE = `/company/list`
export const COMPANY_DETAIL = `/company/detail`
export const COMPANY_ADD = `/company/ POST`
export const COMPANY_UPDATE = `/company/ PUT`
export const COMPANY_DEL = (id) => `/company/${id} DELETE`
export const COMPANY_CHECK = `/company/checkCompany`


