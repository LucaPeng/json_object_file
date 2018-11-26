import * as fs from 'fs';

interface AnyObject {
  [index: string]: any;
}

interface UtilConfig {
  cache?: boolean;
  filePath: string;
}

/**
 * 检测文件是否存在
 * @param {String} filePath 文件路径
 * @return {Boolean} 文件是否存在
 */
function hasFile(filePath: string) {
  if (filePath) {
    let s;
    try {
      s = fs.statSync(filePath);
    } catch (e) {
      return false;
    }
    return s.isFile();
  } else {
    return false;
  }
}

class JsonFileUtil {

  cache: AnyObject | undefined;
  useCache: boolean = false;
  filePath: string = '';

  constructor(config: UtilConfig) {
    this.filePath = config.filePath;
    if (config.cache === true) {
      this.useCache = config.cache;
    }
  }
  
  /**
   * 获取 package.json 内容
   */
  getJSON() {
    if (this.cache !== undefined && this.useCache) {
      return this.cache;
    }
    const fileExist = hasFile(this.filePath);
    if (fileExist) {
      // 如果package.json存在，进行修改
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      const fileJsonContent = JSON.parse(fileContent);
      if (this.useCache) {
        this.cache = fileJsonContent;
      }
      return fileJsonContent;
    } else {
      // 如果 package.json 不存在，初始化失败，提示用户进行 npm 初始化
      throw (new Error('package.json not found'));
    }
  }

  /**
   * 获取 package.json 内容
   */
  clearCache() {
    this.cache = undefined;
  }

  /**
   * 获取 package.json 字段内容
   */
  getItem(key: string): any {
    const packageJSON = this.getJSON();
    return packageJSON && packageJSON[key];
  }

  /**
   * 修改 package.json 内容
   */
  modifyJSON(modifyConfig: AnyObject) {
    const oldJSONContent = this.getJSON();
    // 修改
    const newJSONContent = {
      ...oldJSONContent,
      ...modifyConfig,
    };
    const fileNewContent = JSON.stringify(newJSONContent, null, 2);
    // 缓存
    if (this.useCache) {
      this.cache = newJSONContent;
    }
    // 写入
    fs.writeFileSync(this.filePath, fileNewContent);
  }
};

export default JsonFileUtil;
