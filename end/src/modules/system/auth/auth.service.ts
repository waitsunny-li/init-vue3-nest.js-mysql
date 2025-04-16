import { Inject, Injectable } from '@nestjs/common'

import { UserEntity } from 'src/modules/system/user/entities/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async validateUser(payload: { id: number }): Promise<UserEntity> {
    return await this.userService.findOneById(payload.id)
  }
}
