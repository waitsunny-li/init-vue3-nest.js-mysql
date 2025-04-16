import { ApiProperty } from '@nestjs/swagger'
import { $enum } from 'ts-enum-util'

import { StatusValue } from 'src/common/enums/common.enum'
import { ReqListQuery } from 'src/common/entities/req-list-query'
import { Allow } from 'class-validator'

export class FindUserListDto extends ReqListQuery {
  @Allow()
  @ApiProperty({ description: '账号模糊搜索', required: false })
  account?: string

  @Allow()
  @ApiProperty({ description: '按账号状态查询用户', enum: $enum(StatusValue).getValues(), required: false })
  status?: StatusValue
}
