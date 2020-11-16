import {POST} from "@/utils/Const";

export const LOGIN = `/mini/userLogin ${POST}`
export const GET_USER_INFO = `/mini/getUserInfo`
export const GET_USER_APPS = `/mini/getAppPages`

export const COMMON_TOKEN = `/common/ypQiniuToken`


export const ORDER_PAGE = `/order/list`
export const ORDER_UPDATE = `/order/ PUT`
export const ORDER_TO_DRIVER = `/order/orderToDriver`
export const ORDER_DEL = (id) => `/order/${id} DELETE`

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
export const BUSI_APP_AUTH_URL = `/busiApp/getAuthUrl`



export const MINI_APP_TRAFTS = `/mini/getTrafts`
export const MINI_APP_TEMPLATES = `/mini/getTemplates`
export const MINI_APP_UPLOAD = `/mini/uploadApp`

export const TRANS_COMPANY_PAGE = `/trans/list`
export const TRANS_COMPANY_DETAIL = `/trans/detail`
export const TRANS_COMPANY_ADD = `/trans/ POST`
export const TRANS_COMPANY_UPDATE = `/trans/ PUT`
export const TRANS_COMPANY_DEL = (id) => `/trans/${id} DELETE`

export const MESSAGE_PAGE = `/homeMessage/list`
export const MESSAGE_DETAIL = `/homeMessage/detail`
export const MESSAGE_ADD = `/homeMessage/ POST`
export const MESSAGE_UPDATE = `/homeMessage/ PUT`
export const MESSAGE_DEL = (id) => `/homeMessage/${id} DELETE`

export const TRANS_COMPANY_USER_PAGE = `/transCompanyUser/admin/list`
export const TRANS_COMPANY_USER_CHECK_USER = `/transCompanyUser/checkUser`
export const TRANS_COMPANY_USER_DEL = (id) => `/transCompanyUser/${id} DELETE`


export const COMPANY_PAGE = `/company/list`
export const COMPANY_DETAIL = `/company/detail`
export const COMPANY_ADD = `/company/ POST`
export const COMPANY_UPDATE = `/company/ PUT`
export const COMPANY_DEL = (id) => `/company/${id} DELETE`
export const COMPANY_CHECK = `/company/checkCompany`

export const STATIC_INDEX = `/static/index`
export const STATIC_ORDER_LINE = `/static/orderLine`
export const STATIC_DRIVER_LINE = `/static/driverLine`
export const STATIC_USER_LINE = `/static/userLine`

export const SYSUSER_PAGE = `/adminUser/list`
export const SYSUSER_DETAIL = `/adminUser/detail`
export const SYSUSER_ADD = `/adminUser/ POST`
export const SYSUSER_UPDATE = `/adminUser/ PUT`
export const SYSUSER_DEL = (id) => `/adminUser/${id} DELETE`
export const SYSUSER_ROLES = `/adminUser/roles`
export const SYSUSER_CHANGE_ROLE = `/adminUser/changeRole`

export const PRODUCT_PAGE = `/product/list`
export const PRODUCT_DETAIL = `/product/detail`
export const PRODUCT_ADD = `/product/ POST`
export const PRODUCT_UPDATE = `/product/ PUT`
export const PRODUCT_DEL = (id) => `/product/${id} DELETE`

export const COMMON_ALL = (url) =>`/${url}/all`
export const COMMON_PAGE = (url) =>`/${url}/list`
export const COMMON_DETAIL = (url) =>`/${url}/detail`
export const COMMON_ADD = (url) =>`/${url}/ POST`
export const COMMON_UPDATE = (url) =>`/${url}/ PUT`
export const COMMON_DEL = (url,id) =>`/${url}/${id} DELETE`
