export enum UserType {
  /** 超管 */
  SUPER_ADMIN = 0,
  /** 普通用户 */
  ORDINARY_USER = 1,
}

export enum StatusValue {
  /** 禁用 */
  FORBIDDEN = 0,
  /** 正常使用 */
  NORMAL = 1,
}

export enum ShopType {
  /** 到店 */
  STORE = 1,
  /** 快递 */
  EXPRESS = 2,
  /** 供应商 */
  SUPPLIER = 3,
}

export enum OrderStatus {
  /** 无 */
  NO = 0,
  /** 购物车 */
  CART = 1,
  /** 立即购买 */
  BUY_NOW = 2,
}

export enum PayMethod {
  /** 余额 */
  BALANCE = 1,
  /** 微信 */
  WECHAT = 2,
  /** 支付宝 */
  ALIPAY = 3,
}

export enum MenuType {
  /** 菜单 */
  MENU = 1,
  /** tabs 页面菜单 */
  TAB = 2,
  /** 按钮 */
  BUTTON = 3,
}

export enum FuncType {
  /** 复制 */
  COPY = 1,
  /** 移动 */
  MOVE = 2
}

export enum DelteType {
  /** 永久删除 */
  DELETE = 1,
  /** 回收站 */
  RECOVERY = 2
}

export enum ReportSearchType {
  NODELTE = 0,
  DELTED = 1,
}

export enum GroupType {
  /** 系统分组 */
  SYSTEM = "system",
  /** 用户分组 */
  USER = "user",
  /** 颜色分组 */
  COLOR = "color",
  /** 尺寸分组 */
  SIZE = "size",
  /** 商品分组 */
  PRODUCT = "product",
}
