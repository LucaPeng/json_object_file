## json_object_file

A Tool to read or modify object_json file according to key.

### Installation & Usage

install through npm or yarn

```
  npm install object-json-file
  // yarn add object-json-file
```

#### API

```javascript
  import JsonFileUtil from 'object-json-file';
  const jsonUtil = new JsonFileUtil({
    cache: true,
    filePath: 'path-to-json-file',
  });
  console.log(jsonUtil.getJSON());
  jsonUtil.modifyJSON({
    test: 'aaa'
  });
  // 如果使用 cache 模式，请在执行对json文件有改动的操作(基于modifyJSON 方法除外) 需要清除缓存
  jsonUtil.clearCache();
```