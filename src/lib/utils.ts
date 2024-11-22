import { capitalize } from 'lodash'

export function prettifyCapitalisedEnumValue(value: string): string {
  return value.split('_').map(capitalize).join(' ')
}
