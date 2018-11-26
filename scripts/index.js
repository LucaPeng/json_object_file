"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function hasFile(filePath) {
    if (filePath) {
        var s = void 0;
        try {
            s = fs.statSync(filePath);
        }
        catch (e) {
            return false;
        }
        return s.isFile();
    }
    else {
        return false;
    }
}
var JsonFileUtil = (function () {
    function JsonFileUtil(config) {
        this.useCache = false;
        this.filePath = '';
        this.filePath = config.filePath;
        if (config.cache === true) {
            this.useCache = config.cache;
        }
    }
    JsonFileUtil.prototype.getJSON = function () {
        if (this.cache !== undefined && this.useCache) {
            return this.cache;
        }
        var fileExist = hasFile(this.filePath);
        if (fileExist) {
            var fileContent = fs.readFileSync(this.filePath, 'utf-8');
            var fileJsonContent = JSON.parse(fileContent);
            if (this.useCache) {
                this.cache = fileJsonContent;
            }
            return fileJsonContent;
        }
        else {
            throw (new Error('package.json not found'));
        }
    };
    JsonFileUtil.prototype.clearCache = function () {
        this.cache = undefined;
    };
    JsonFileUtil.prototype.getItem = function (key) {
        var packageJSON = this.getJSON();
        return packageJSON && packageJSON[key];
    };
    JsonFileUtil.prototype.modifyJSON = function (modifyConfig) {
        var oldJSONContent = this.getJSON();
        var newJSONContent = __assign({}, oldJSONContent, modifyConfig);
        var fileNewContent = JSON.stringify(newJSONContent, null, 2);
        if (this.useCache) {
            this.cache = newJSONContent;
        }
        fs.writeFileSync(this.filePath, fileNewContent);
    };
    return JsonFileUtil;
}());
;
exports.default = JsonFileUtil;
