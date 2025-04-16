import { Allow } from 'class-validator'

export class CreateJwtTokenDto {
  @Allow()
  accessToken: string
  // @Allow()
  refreshToken?: string
}
