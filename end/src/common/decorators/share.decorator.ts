import { SetMetadata } from '@nestjs/common'

/**
 * 分享接口
 */
export const ALLOW_SHARE = 'allowShare'

export const AllowShare = () => SetMetadata(ALLOW_SHARE, true)
