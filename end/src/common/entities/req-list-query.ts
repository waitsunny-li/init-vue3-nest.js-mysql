import { ApiProperty } from '@nestjs/swagger'
import { Allow } from 'class-validator'

export class ReqListQuery {
  @Allow()
  @ApiProperty({ description: '显示页数' })
  page: number

  @Allow()
  @ApiProperty({ description: '每页显示条数' })
  size: number
}
