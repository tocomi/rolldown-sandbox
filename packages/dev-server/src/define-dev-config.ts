import type { BuildOptions } from 'rolldown'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface ServeOptions {}

export interface DevConfig {
  build?: BuildOptions
  serve?: ServeOptions
}

export function defineDevConfig(config: DevConfig): DevConfig {
  return config
}
