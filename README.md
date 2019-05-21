| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-pagination.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-pagination.svg?style=flat-square)

[![xy-pagination](https://nodei.co/npm/xy-pagination.png)](https://npmjs.org/package/xy-pagination)

# xy-pagination

分页组件

## 安装

```bash
# yarn
yarn add xy-pagination
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import Pagination from "xy-pagination";
ReactDOM.render(<Pagination total={50} />, container);
```

## API

| 属性             | 说明                     | 类型                                                                                       | 默认值               |
| ---------------- | ------------------------ | ------------------------------------------------------------------------------------------ | -------------------- |
| current          | 当前页数                 | number                                                                                     | 1                    |
| defaultCurrent   | 默认当前页数             | number                                                                                     | 1                    |
| onChange         | 页码改变事件             | (page: number, pageSize: number) => void                                                   | -                    |
| pageSize         | 每页条数                 | number                                                                                     | 10                   |
| defaultPageSize  | 默认每页条数             | number                                                                                     | 10                   |
| onPageSizeChange | 每页条数改变             | (pageSize: number) => void                                                                 | -                    |
| pageSizeOptions  | 每页可以显示多少条       | number[]                                                                                   | [10, 20, 30, 40, 50] |
| total            | 总页数                   | number                                                                                     | 0                    |
| showQuickJumper  | 显示快速跳转输入框       | boolean                                                                                    | false                |
| showSizeChanger  | 显示更改每页条数下拉列表 | boolean                                                                                    | false                |
| simple           | 是否精简模式             | boolean                                                                                    | false                |
| itemRender       | 自定义渲染               | (current: number, page: PageItemType, originalElement: React.ReactNode) => React.ReactNode | -                    |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-pagination is released under the MIT license.
