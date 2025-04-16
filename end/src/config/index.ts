import { StringUtils } from 'src/utils'
import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'

const env = process.env.NODE_ENV

export default () => {
  const path = StringUtils.equalsIgnoreCase(env, 'test') ? `../config/${env}.yml` : `../../config/${env}.yml`
  return yaml.load(readFileSync(join(__dirname, path), 'utf8')) as Record<string, any>
}
