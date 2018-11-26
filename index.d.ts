// Type definitions for {{module.name}}

interface UtilConfig {
  cache?: boolean;
  filePath: string;
}

interface ObjectJson {
  [index:string]: any;
}

declare class JsonFileUtil {
  constructor(config: UtilConfig);

  getJSON(): ObjectJson;
  getItem(key: string): any;
  clearCache(): void;
  modifyJSON(): void;
}
