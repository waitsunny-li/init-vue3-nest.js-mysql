import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Allow } from 'class-validator'
import { LoginUserDto } from './login-user.dto'

export class ModifyPasswordDto extends LoginUserDto {
  @Allow()
  @ApiProperty({ description: '新密码' })
  @IsString({ message: 'newPassword 类型错误' })
  @IsNotEmpty({ message: '新密码不能为空' })
  readonly newPassword: string

  @Allow()
  @ApiProperty({ description: '确认密码' })
  @IsString({ message: 'confirmPassword 类型错误' })
  @IsNotEmpty({ message: '确认密码不能为空' })
  readonly confirmPassword: string
}
