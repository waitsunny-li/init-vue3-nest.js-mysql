import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository, getManager, In } from 'typeorm'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import { Logger } from 'src/common/libs/log4js/log4j.util'
import { genSalt, hash, compare } from 'bcryptjs'

import { JwtService } from '@nestjs/jwt'
import { UserEntity } from './entities/user.entity'
import { ResultData } from 'src/common/entities/result'
import { AppHttpCode } from 'src/common/enums/code.enum'
import { CreateJwtTokenDto } from './dto/create-jwt-token.dto'
import { FindUserListDto } from './dto/find-user-list.dto'
import { ModifyPasswordDto } from './dto/modify-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ){}
  /** 创建用户信息 */
  async create(dto: CreateUserDto): Promise<ResultData> {
    if (await this.findOneByTel(dto.tel)) return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '帐号已存在，请调整后重新注册！')
    
    // 防止重复
    const salt = await genSalt()
    dto.password = await hash(dto.password, salt)
    const account = dto.tel
    const user = plainToInstance(UserEntity, {salt, account, ...dto}, {
      ignoreDecorators: true
    })
    const result = await this.userRepo.save(user)
    return ResultData.ok(instanceToPlain(result));
  }

  // 登录用户
  async login(dto: LoginUserDto): Promise<ResultData> {
    console.log(dto);
    const user = await this.findOneByTel(dto.tel)
    if (!user) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '帐号不存在，请检查后重新登录！')
    const checkPassword = await compare(dto.password, user.password)
    if (!checkPassword) return ResultData.fail(AppHttpCode.USER_ACCOUNT_FORBIDDEN, '密码错误，请检查后重新登录！')
    // 生成token
    console.log(user, checkPassword);
    const data = this.genJwtToken({ id: user.id })
    return ResultData.ok(data)
  }

  /** 查询用户列表 */
  async findList(dto: FindUserListDto): Promise<ResultData> {
    const { page, size, account, status } = dto
    const where = {
      ...(status ? { status } : null),
      ...(account ? { account: Like(`%${account}%`) } : null),
    }
    const users = await this.userRepo.findAndCount({ where, order: { id: 'DESC' }, skip: size * (page - 1), take: size })
    return ResultData.ok({ list: instanceToPlain(users[0]), total: users[1] })
  }

  async curUserInfo(user: UserEntity): Promise<ResultData> {
    return ResultData.ok(instanceToPlain(user))
  }

  async findAll(): Promise<ResultData> {
    const list = await this.userRepo.find({order: { id: 'DESC' }})
    return ResultData.ok(instanceToPlain(list))
  }

  async findOneByTel(tel: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { tel } });
  }

  async findOneById(id: number): Promise<UserEntity>  {
    const user = await this.userRepo.findOne({ where: { id } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async logout(): Promise<ResultData> {
    return ResultData.ok()
  }

  async modifyPassword(user: UserEntity, dto: ModifyPasswordDto): Promise<ResultData> {
    let curUser = await this.findOneByTel(dto.tel)
    if (!curUser) return ResultData.fail(AppHttpCode.USER_ACCOUNT_FORBIDDEN, '手机号码不存在，请检查后重新登录！')
    if (dto.newPassword !== dto.confirmPassword) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '两次密码输入不一致，请重新输入！')
    const checkPassword = await compare(dto.password, curUser.password)
    if (!checkPassword) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '原密码错误，请检查后重新输入！')
    let salt = await genSalt()
    curUser.password = await hash(dto.newPassword, salt)
    curUser.salt = salt
    let res = await this.userRepo.save(curUser)
    return ResultData.ok(res)
  }

  /**
   * 生成 token 与 刷新 token
   * @param payload
   * @returns
   */
  genJwtToken(payload: { id: number }): CreateJwtTokenDto {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`
    // const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get('jwt.refreshExpiresIn') ||  '1d'})
    return { accessToken }
  }

  /** 校验 token */
  verifyJwtToken(token: string): string {
    try {
      if (!token) return null
      const id = this.jwtService.verify(token.replace('Bearer ', ''))
      return id
    } catch (error) {
      return null
    }
  }
}
