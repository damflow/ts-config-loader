import { promises as fs } from "fs";
import { join as pathJoin } from "path";

import { ConfigError } from "./config-error";

export class ConfigLoader {
  /**
   * Returns a Config with loaded values from environment variables or the config file.
   *
   * @throws {ConfigError} If not all required values could be loaded.
   * @static
   * @returns {Promise<Config>}
   * @memberof ConfigLoader
   */
  public static async load<T>(T: { new (): T }): Promise<T> {
    const config = new T();
    const parameters = Object.keys(config);

    const loadedConfig = await this.loadConfig(parameters);
    parameters.forEach((key) => {
      if (config[key] === undefined && loadedConfig[key] === undefined) {
        throw new ConfigError(`Missing parameter ${key}.`);
      } else if (loadedConfig[key] !== undefined) {
        config[key] = loadedConfig[key];
      }
    });

    return config;
  }

  private static async loadConfig(parameters: string[]) {
    return {
      ...(await this.loadConfigFile()),
      ...(await this.loadEnvironmentVariables(parameters)),
    };
  }

  private static async loadConfigFile() {
    try {
      const configPath = pathJoin(process.cwd(), "config.json");
      return JSON.parse((await fs.readFile(configPath)).toString());
    } catch (error) {
      return {};
    }
  }

  private static async loadEnvironmentVariables(parameters: string[]) {
    const conf = {};
    parameters.forEach((key) => {
      const envVar = process.env[key];
      if (envVar) {
        conf[key] = envVar;
      }
    });

    return conf;
  }
}
