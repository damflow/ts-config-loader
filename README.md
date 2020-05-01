# Zero dependency config loader for TypeScript

The simple solution for type-safe configurations in TypeScript. Create your own Config class and load variables from files or environment variables.

## Installation

```shell
    yarn add @damflow/ts-config-loader
```

## Usage

### Create a configuration

```ts
import { BaseConfig } from "@damflow/uniconf";

// Create your custom config class.
class MyConfig extends BaseConfig {
  // Add an optional parameter with fallback.
  private APP_PORT = 3000;

  // Add a required parameter.
  private APP_NAME = undefined;

  // Create getter. At this point all properties of this class will be set.
  public get app() {
    return {
      port: this.APP_PORT,
      name: this.APP_NAME,
    };
  }
}
```

### Load a custom configuration

1. Add required properties to a configuration file at your project root.

   > Project root: /config.json

   ```json
   {
     "APP_NAME": "Crazy Todo App"
   }
   ```

2. Additionally you can also add environment variables. The results of the two sources will be combined.

3. Load the configuration.

   ```ts
   import { ConfigLoader } from "@damflow/uniconf";

   const config = await ConfigLoader.load(MyConfig);

   // Retrieve custom properties.
   const { app } = config;
   console.log(`The port: ${app.port}.`);
   console.log(`The name: ${app.name}.`);
   ```

## Author

Paul von Allwörden

## License

MIT
