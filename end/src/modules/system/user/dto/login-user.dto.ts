import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Allow } from 'class-validator'

export class LoginUserDto {
  @Allow()
  @ApiProperty({ description: '手机号' })
  @IsString({ message: 'phone 类型错误' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly tel: string

  @Allow()
  @ApiProperty({ description: '密码' })
  @IsString({ message: 'password 类型错误' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string
}
