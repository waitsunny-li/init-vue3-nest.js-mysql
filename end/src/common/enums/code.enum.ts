export enum AppHttpCode {
  /** 公共错误 */
  /** 服务器出错 */
  SERVICE_ERROR = 500500,
  /** 数据为空 */
  DATA_IS_EMPTY = 100001,
  /** 参数有误 */
  PARAM_INVALID = 100002,
  /** 文件类型错误 */
  FILE_TYPE_ERROR = 100003,
  /** 文件超出大小 */
  FILE_SIZE_EXCEED_LIMIT = 100004,

  /** 系统管理错误 */
  /** 创建用户已存在，手机号，邮箱， 用户名等 */
  USER_CREATE_EXISTING = 200001,
  /** 两次密码输入不一致, 账号密码不一致等 */
  USER_PASSWORD_INVALID = 200002,
  /** 帐号被禁用 */
  USER_ACCOUNT_FORBIDDEN = 200003,
  /** 用户状态更改，当前用户 与 修改用户一致 */
  USER_FORBIDDEN_UPDATE = 20004,
  /** 用户不存在 */
  USER_NOT_FOUND = 200005,

  /** 商品管理错误code */
  /** 商品管理 */
  /** 商品已存在，请调整后重新创建！ */
  GOOD_NAME_EXIST = 600001,
  /** 订单不存在！ */
  ORDER_IS_NOT_EXIST = 300001,
  /** 缺少商品信息！ */
  GOOD_NOT_EXIST = 600002,
  /** HTTPS连接密码不能为空！ */
  GOOD_IS_NOT_CURRENT_USER_UPDATE = 600003,
  /** 连接数据存在关联不能删除！ */
  CONNECT_EXIT_RELATION = 600004,
  /** 连接数据不存在！ */
  CONNECT_NOT_FOUND = 600005,
  /** 测试连接失败，请检查配置！ */
  CONNECT_TEST_FAIL = 600006,

  /** 分组管理 */
  /** 分组已存在，请调整后重新创建！ */
  GROUP_CREATE_EXISTING = 610001,
  /** 分组数据存在关联不能删除！ */
  GROUP_EXIT_RELATION = 610002,
  /** 分组不存在或已删除！ */
  GROUP_NOT_FOUND = 610003,
  /** 父分组不存在或已删除！ */
  GROUP_PARENT_NOT_FOUND = 610004,
  /** 群组类型无效 */
  GROUP_TYPE_INVALID = 610005,

  /** 报表管理 */
  /** 报表已存在, 请调整后重新创建！ */
  REPORT_CREATE_EXISTING = 620001,
  /** 报表不存在或已删除！ */
  REPORT_NOT_FOUND = 620002,

  /** 数据查询 */
  /** 数据查询失败！ */
  DATA_SEARCH_FAIL = 630001,
  /** 数据源不存在！ */
  DATA_SOURCE_NOT_FOUND = 630002,

  /** 参数管理 */
  PARAMS_ERROR = 630003,

  /** 令牌管理 */
  /** 令牌已存在，请调整后重新创建！ */
  TOCKEN_CREATE_EXISTING = 640001,
  /** 令牌不存在！ */
  TOCKEN_NOT_FOUND = 640002,

  /** 反馈信息管理 */
  /** 反馈用户信息已存在，请调整后重新创建！ */
  FEEDBACKUSER_CREATE_EXISTING = 650001,
  /** 反馈用户信息不存在！ */
  FEEDBACKUSER_NOT_FOUND = 650002,
}
