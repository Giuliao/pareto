(function() {
var __webpack_modules__ = {
"../core/configs/entry.js": (function (module, __unused_webpack_exports, __webpack_require__) {
eval("\"use strict\";\nconst fs = __webpack_require__(/*! fs-extra */\"fs-extra\");\nconst path = __webpack_require__(/*! path */\"path\");\nconst cwd = process.cwd();\nconst PAGE_DIR = path.resolve(cwd, \"app\");\nconst TEMP = path.resolve(cwd, \"./.mpa-ssr\");\nconst entryPath = path.resolve(TEMP, \"./server.ts\");\nconst CLIENT_DIR = path.resolve(TEMP, \"client\");\nconst CLIENT_WRAPPER = path.resolve(cwd, \"./client-entry.tsx\");\n/**\n * @type {record<string,string>}\n */ const pageEntries = fs.readdirSync(PAGE_DIR).reduce((entry, filename)=>{\n    const pageEntry = path.resolve(PAGE_DIR, filename, \"index.tsx\");\n    entry[filename] = pageEntry;\n    return entry;\n}, {});\nconst getServerEntry = ()=>{\n    const getPagesStr = ()=>{\n        const importStr = Object.entries(pageEntries).reduce((result, [pageName, modulePath])=>{\n            return result + `import ${pageName} from '${modulePath}';\\n`;\n        }, \"\") + \"\\n\";\n        const pageNames = Object.keys(pageEntries);\n        const exportStr = `const pages = { ${pageNames.join(\", \")} };\\n\\n`;\n        return {\n            importStr,\n            exportStr\n        };\n    };\n    const getRuntimeStr = ()=>{\n        const assetsStr = `const assets = __non_webpack_require__('../webpack-assets.json');\\n\\n`;\n        return {\n            importStr: `const { setConfig } = require('${path.resolve(__dirname, \"./runtime.config.ts\")}');\\n\\n`,\n            runStr: assetsStr + \"setConfig({ pages, assets });\\n\"\n        };\n    };\n    const pageStr = getPagesStr();\n    const runtimeStr = getRuntimeStr();\n    const entryStr = pageStr.importStr + runtimeStr.importStr + pageStr.exportStr + runtimeStr.runStr;\n    fs.mkdirSync(TEMP, {\n        recursive: true\n    });\n    fs.writeFileSync(entryPath, entryStr);\n    return entryPath;\n};\nconst getClientEntries = ()=>{\n    fs.removeSync(CLIENT_DIR);\n    fs.mkdirSync(CLIENT_DIR, {\n        recursive: true\n    });\n    return Object.entries(pageEntries).reduce((clientEntries, [pageName, modulePath])=>{\n        const ext = modulePath.slice(modulePath.lastIndexOf(\".\"), modulePath.length);\n        const pageEntry = path.resolve(CLIENT_DIR, pageName + ext);\n        const entryStr = `import page from '${modulePath}';\\nimport { startApp } from '${CLIENT_WRAPPER}';\\n` + `startApp(page)`;\n        fs.writeFileSync(pageEntry, entryStr);\n        clientEntries[pageName] = [\n            path.resolve(CLIENT_DIR, `${pageName}${ext}`)\n        ];\n        return clientEntries;\n    }, {});\n};\nmodule.exports = {\n    getServerEntry,\n    getClientEntries,\n    pageEntries\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvcmUvY29uZmlncy9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcblxuY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKTtcbmNvbnN0IFBBR0VfRElSID0gcGF0aC5yZXNvbHZlKGN3ZCwgXCJhcHBcIik7XG5jb25zdCBURU1QID0gcGF0aC5yZXNvbHZlKGN3ZCwgXCIuLy5tcGEtc3NyXCIpO1xuY29uc3QgZW50cnlQYXRoID0gcGF0aC5yZXNvbHZlKFRFTVAsIFwiLi9zZXJ2ZXIudHNcIik7XG5jb25zdCBDTElFTlRfRElSID0gcGF0aC5yZXNvbHZlKFRFTVAsIFwiY2xpZW50XCIpO1xuY29uc3QgQ0xJRU5UX1dSQVBQRVIgPSBwYXRoLnJlc29sdmUoY3dkLCBcIi4vY2xpZW50LWVudHJ5LnRzeFwiKTtcblxuLyoqXG4gKiBAdHlwZSB7cmVjb3JkPHN0cmluZyxzdHJpbmc+fVxuICovXG5jb25zdCBwYWdlRW50cmllcyA9IGZzLnJlYWRkaXJTeW5jKFBBR0VfRElSKS5yZWR1Y2UoKGVudHJ5LCBmaWxlbmFtZSkgPT4ge1xuICBjb25zdCBwYWdlRW50cnkgPSBwYXRoLnJlc29sdmUoUEFHRV9ESVIsIGZpbGVuYW1lLCBcImluZGV4LnRzeFwiKTtcbiAgZW50cnlbZmlsZW5hbWVdID0gcGFnZUVudHJ5O1xuICByZXR1cm4gZW50cnk7XG59LCB7fSk7XG5cbmNvbnN0IGdldFNlcnZlckVudHJ5ID0gKCkgPT4ge1xuICBjb25zdCBnZXRQYWdlc1N0ciA9ICgpID0+IHtcbiAgICBjb25zdCBpbXBvcnRTdHIgPVxuICAgICAgT2JqZWN0LmVudHJpZXMocGFnZUVudHJpZXMpLnJlZHVjZSgocmVzdWx0LCBbcGFnZU5hbWUsIG1vZHVsZVBhdGhdKSA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHQgKyBgaW1wb3J0ICR7cGFnZU5hbWV9IGZyb20gJyR7bW9kdWxlUGF0aH0nO1xcbmA7XG4gICAgICB9LCBcIlwiKSArIFwiXFxuXCI7XG5cbiAgICBjb25zdCBwYWdlTmFtZXMgPSBPYmplY3Qua2V5cyhwYWdlRW50cmllcyk7XG4gICAgY29uc3QgZXhwb3J0U3RyID0gYGNvbnN0IHBhZ2VzID0geyAke3BhZ2VOYW1lcy5qb2luKFwiLCBcIil9IH07XFxuXFxuYDtcblxuICAgIHJldHVybiB7IGltcG9ydFN0ciwgZXhwb3J0U3RyIH07XG4gIH07XG5cbiAgY29uc3QgZ2V0UnVudGltZVN0ciA9ICgpID0+IHtcbiAgICBjb25zdCBhc3NldHNTdHIgPSBgY29uc3QgYXNzZXRzID0gX19ub25fd2VicGFja19yZXF1aXJlX18oJy4uL3dlYnBhY2stYXNzZXRzLmpzb24nKTtcXG5cXG5gO1xuICAgIHJldHVybiB7XG4gICAgICBpbXBvcnRTdHI6IGBjb25zdCB7IHNldENvbmZpZyB9ID0gcmVxdWlyZSgnJHtwYXRoLnJlc29sdmUoXG4gICAgICAgIF9fZGlybmFtZSxcbiAgICAgICAgXCIuL3J1bnRpbWUuY29uZmlnLnRzXCJcbiAgICAgICl9Jyk7XFxuXFxuYCxcbiAgICAgIHJ1blN0cjogYXNzZXRzU3RyICsgXCJzZXRDb25maWcoeyBwYWdlcywgYXNzZXRzIH0pO1xcblwiLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgcGFnZVN0ciA9IGdldFBhZ2VzU3RyKCk7XG4gIGNvbnN0IHJ1bnRpbWVTdHIgPSBnZXRSdW50aW1lU3RyKCk7XG5cbiAgY29uc3QgZW50cnlTdHIgPVxuICAgIHBhZ2VTdHIuaW1wb3J0U3RyICtcbiAgICBydW50aW1lU3RyLmltcG9ydFN0ciArXG4gICAgcGFnZVN0ci5leHBvcnRTdHIgK1xuICAgIHJ1bnRpbWVTdHIucnVuU3RyO1xuXG4gIGZzLm1rZGlyU3luYyhURU1QLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICBmcy53cml0ZUZpbGVTeW5jKGVudHJ5UGF0aCwgZW50cnlTdHIpO1xuXG4gIHJldHVybiBlbnRyeVBhdGg7XG59O1xuXG5jb25zdCBnZXRDbGllbnRFbnRyaWVzID0gKCkgPT4ge1xuICBmcy5yZW1vdmVTeW5jKENMSUVOVF9ESVIpO1xuICBmcy5ta2RpclN5bmMoQ0xJRU5UX0RJUiwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhwYWdlRW50cmllcykucmVkdWNlKFxuICAgIChjbGllbnRFbnRyaWVzLCBbcGFnZU5hbWUsIG1vZHVsZVBhdGhdKSA9PiB7XG4gICAgICBjb25zdCBleHQgPSBtb2R1bGVQYXRoLnNsaWNlKFxuICAgICAgICBtb2R1bGVQYXRoLmxhc3RJbmRleE9mKFwiLlwiKSxcbiAgICAgICAgbW9kdWxlUGF0aC5sZW5ndGhcbiAgICAgICk7XG4gICAgICBjb25zdCBwYWdlRW50cnkgPSBwYXRoLnJlc29sdmUoQ0xJRU5UX0RJUiwgcGFnZU5hbWUgKyBleHQpO1xuICAgICAgY29uc3QgZW50cnlTdHIgPVxuICAgICAgICBgaW1wb3J0IHBhZ2UgZnJvbSAnJHttb2R1bGVQYXRofSc7XFxuaW1wb3J0IHsgc3RhcnRBcHAgfSBmcm9tICcke0NMSUVOVF9XUkFQUEVSfSc7XFxuYCArXG4gICAgICAgIGBzdGFydEFwcChwYWdlKWA7XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMocGFnZUVudHJ5LCBlbnRyeVN0cik7XG4gICAgICBjbGllbnRFbnRyaWVzW3BhZ2VOYW1lXSA9IFtwYXRoLnJlc29sdmUoQ0xJRU5UX0RJUiwgYCR7cGFnZU5hbWV9JHtleHR9YCldO1xuXG4gICAgICByZXR1cm4gY2xpZW50RW50cmllcztcbiAgICB9LFxuICAgIHt9XG4gICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0U2VydmVyRW50cnksXG4gIGdldENsaWVudEVudHJpZXMsXG4gIHBhZ2VFbnRyaWVzLFxufTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQU1BO0FBQUE7QUFBQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSJ9");}),
"../core/configs/runtime.config.ts": (function (__unused_webpack_module, exports) {
eval("\"use strict\";\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports.setConfig = exports.getConfig = void 0;\nlet config = null;\nconst getConfig = ()=>config;\nexports.getConfig = getConfig;\nconst setConfig = (value)=>{\n    config = value;\n};\nexports.setConfig = setConfig;\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvcmUvY29uZmlncy9ydW50aW1lLmNvbmZpZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY29uZmlnOiBhbnkgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29uZmlnID0gKCkgPT4gY29uZmlnO1xuXG5leHBvcnQgY29uc3Qgc2V0Q29uZmlnID0gKHZhbHVlOiBhbnkpID0+IHtcbiAgY29uZmlnID0gdmFsdWU7XG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUEifQ==");}),
"./.mpa-ssr/server.ts": (function (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
eval("\"use strict\";\nvar _index = _interopRequireDefault(__webpack_require__(/*! /Users/zhangyuanqing/works/github/pareto/packages/website/app/home/index.tsx */\"./app/home/index.tsx\"));\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n        default: obj\n    };\n}\nconst { setConfig } = __webpack_require__(/*! /Users/zhangyuanqing/works/github/pareto/packages/core/configs/runtime.config.ts */\"../core/configs/runtime.config.ts\");\nconst pages = {\n    home: _index.default\n};\nconst assets = require('../webpack-assets.json');\nsetConfig({\n    pages,\n    assets\n});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vLm1wYS1zc3Ivc2VydmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBob21lIGZyb20gJy9Vc2Vycy96aGFuZ3l1YW5xaW5nL3dvcmtzL2dpdGh1Yi9wYXJldG8vcGFja2FnZXMvd2Vic2l0ZS9hcHAvaG9tZS9pbmRleC50c3gnO1xuXG5jb25zdCB7IHNldENvbmZpZyB9ID0gcmVxdWlyZSgnL1VzZXJzL3poYW5neXVhbnFpbmcvd29ya3MvZ2l0aHViL3BhcmV0by9wYWNrYWdlcy9jb3JlL2NvbmZpZ3MvcnVudGltZS5jb25maWcudHMnKTtcblxuY29uc3QgcGFnZXMgPSB7IGhvbWUgfTtcblxuY29uc3QgYXNzZXRzID0gX19ub25fd2VicGFja19yZXF1aXJlX18oJy4uL3dlYnBhY2stYXNzZXRzLmpzb24nKTtcblxuc2V0Q29uZmlnKHsgcGFnZXMsIGFzc2V0cyB9KTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUVBO0FBQUE7QUFBQTtBQUFBIn0=");}),
"./app/home/index.tsx": (function (__unused_webpack_module, exports, __webpack_require__) {
eval("\"use strict\";\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports[\"default\"] = void 0;\nvar _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */\"react/jsx-runtime\");\nconst Home = ()=>{\n    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(\"div\", {\n        children: \"hello world\"\n    });\n};\nvar _default = exports[\"default\"] = Home;\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXBwL2hvbWUvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEhvbWUgPSAoKSA9PiB7XG4gIHJldHVybiA8ZGl2PmhlbGxvIHdvcmxkPC9kaXY+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUEifQ==");}),
"./server-entry.tsx": (function (__unused_webpack_module, exports, __webpack_require__) {
eval("\"use strict\";\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports.app = void 0;\nvar _server = __webpack_require__(/*! react-dom/server */\"react-dom/server\");\nvar _express = _interopRequireDefault(__webpack_require__(/*! express */\"express\"));\nvar _entry = __webpack_require__(/*! ../core/configs/entry */\"../core/configs/entry.js\");\nvar _runtime = __webpack_require__(/*! ../core/configs/runtime.config */\"../core/configs/runtime.config.ts\");\nvar _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */\"react/jsx-runtime\");\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n        default: obj\n    };\n}\nconst app = exports.app = (0, _express.default)();\napp.get(\"*\", async (req, res)=>{\n    const { url } = req;\n    const path = url.split(\"/\").pop().split(\".\")[0];\n    if (!_entry.pageEntries[path]) return;\n    const { assets, pages, header } = (0, _runtime.getConfig)();\n    const Page = pages[path];\n    const asset = assets[path];\n    const jsx = /*#__PURE__*/ (0, _jsxRuntime.jsx)(Page, {});\n    const html = (0, _server.renderToString)(jsx);\n    res.end(html);\n});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2VydmVyLWVudHJ5LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCI7XG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgcGFnZUVudHJpZXMgfSBmcm9tIFwiLi4vY29yZS9jb25maWdzL2VudHJ5XCI7XG5pbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tIFwiLi4vY29yZS9jb25maWdzL3J1bnRpbWUuY29uZmlnXCI7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC5nZXQoXCIqXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IHVybCB9ID0gcmVxO1xuICBjb25zdCBwYXRoID0gdXJsLnNwbGl0KFwiL1wiKS5wb3AoKSEuc3BsaXQoXCIuXCIpWzBdO1xuXG4gIGlmICghcGFnZUVudHJpZXNbcGF0aF0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7IGFzc2V0cywgcGFnZXMsIGhlYWRlciB9ID0gZ2V0Q29uZmlnKCk7XG5cbiAgY29uc3QgUGFnZSA9IHBhZ2VzW3BhdGhdO1xuXG4gIGNvbnN0IGFzc2V0ID0gYXNzZXRzW3BhdGhdIGFzIHtcbiAgICBqczogc3RyaW5nW10gfCBzdHJpbmc7XG4gIH07XG5cbiAgY29uc3QganN4ID0gPFBhZ2UgLz47XG5cbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKGpzeCk7XG5cbiAgcmVzLmVuZChodG1sKTtcbn0pO1xuXG5leHBvcnQgeyBhcHAgfTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBRUE7QUFFQTtBQUlBO0FBRUE7QUFFQTtBQUNBIn0=");}),
"express": (function (module) {
module.exports = require('express')}),
"fs-extra": (function (module) {
module.exports = require('fs-extra')}),
"react-dom/server": (function (module) {
module.exports = require('react-dom/server')}),
"react/jsx-runtime": (function (module) {
module.exports = require('react/jsx-runtime')}),
"path": (function (module) {
module.exports = require('path')}),

}
// The module cache
 var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
// Check if module is in cache
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
      return cachedModule.exports;
      }
      // Create a new module (and put it into the cache)
      var module = (__webpack_module_cache__[moduleId] = {
       exports: {}
      });
      // Execute the module function
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
// Return the exports of the module
 return module.exports;

}
__webpack_require__("./.mpa-ssr/server.ts");
var __webpack_exports__ = __webpack_require__("./server-entry.tsx");module.exports = __webpack_exports__;

})()
