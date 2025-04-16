import { Controller, Get, Post, Body, Patch, Query, Param, Delete, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody, ApiConsumes, ApiQuery, ApiExtraModels, ApiBearerAuth } from '@nestjs/swagger'
import { UserService } from './user.service'
import { ResultData } from 'src/common/entities/result'
import { UserEntity } from './entities/user.entity'

import { ApiResult } from 'src/common/decorators/api-result.decorator'
import { AllowAnon } from 'src/common/decorators/allow-anon.decorator'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { FindUserListDto } from './dto/find-user-list.dto'
import { ModifyPasswordDto } from './dto/modify-password.dto'

@ApiTags('用户管理')
@ApiExtraModels(ResultData, UserEntity)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AllowAnon()
  @ApiOperation({ summary: '创建用户，此接口只有admin权限可以访问' })
  @ApiResult()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<ResultData> {
    return this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: '当前用户信息' })
  @ApiResult()
  @Get('info')
  async curUserInfo(@Req() req): Promise<ResultData> {
    return this.userService.curUserInfo(req.user)
  }

  @ApiOperation({ summary: '退出登录' })
  @ApiResult()
  @Post('logout')
  async logout(@Req() req): Promise<ResultData> {
    return this.userService.logout()
  }

  @Get('all')
  @ApiOperation({ summary: '查询所有用户' })
  @ApiResult(UserEntity, true, false)
  async findAll() {
    return this.userService.findAll()
  }

  @Get('list')
  @ApiOperation({ summary: '分页查询数据' })
  @ApiResult(UserEntity, true, true)
  async findList(@Query() dto: FindUserListDto): Promise<ResultData> {
    return this.userService.findList(dto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id)
  }

  @ApiOperation({ summary: '修改密码' })
  @ApiResult()
  @Post('modify/password')
  async modifyPassword(@Req() req, @Body() dto: ModifyPasswordDto): Promise<ResultData> {
    return this.userService.modifyPassword(req.user, dto)
  }

  @Post('login')
  @AllowAnon()
  async update(@Body() dto: LoginUserDto): Promise<ResultData> {
    return this.userService.login(dto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
