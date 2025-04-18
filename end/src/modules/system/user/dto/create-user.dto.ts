import { ApiProperty } from '@nestjs/swagger'
import { Allow, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  // @ApiProperty({ description: '用户账号' })
  // @IsString({ message: 'account 类型错误，正确类型 string' })
  // @IsNotEmpty({ message: 'account 不能为空' })
  // @MinLength(5, { message: '账号至少5个字符' })
  // @MaxLength(20, { message: '账号最多20个字符' })
  // readonly account?: string

  @Allow()
  @ApiProperty({ description: '密码' })
  @IsString({ message: 'password 类型错误，正确类型 string' })
  @IsNotEmpty({ message: 'password 不能为空' })
  password: string

  @Allow()
  @ApiProperty({ description: '手机号', required: false })
  @IsString({ message: 'phoneNum 类型错误，正确类型 string' })
  @IsMobilePhone('zh-CN', { strictMode: false }, { message: '请输入正确的手机号' })
  @IsOptional()
  readonly tel: string

  @ApiProperty({ description: '邮箱', required: false })
  @IsString({ message: 'email 类型错误，正确类型 string' })
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @ApiProperty({ description: '头像', required: false })
  @IsString({ message: 'avatar 类型错误，正确类型 string' })
  @IsOptional()
  readonly avatar?: string

  @Allow()
  @ApiProperty({ description: '备注' })
  @IsString({ message: 'remark 类型错误，正确类型 string' })
  @IsOptional()
  readonly remark?: string
}
