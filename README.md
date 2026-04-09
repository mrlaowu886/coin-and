# BNB Chain 代币查询看板

这是一个零构建工具的静态单页模板，入口文件是 [index.html](/D:/little%20boy/index.html)。

## 现在能做什么

- 输入任意 `BNB Chain` 代币合约地址
- 或者直接粘贴 `BscScan` 的代币链接
- 页面会自动展示总代币量、流通量、Burn 比例、Owner 状态
- 同时补充主交易对的价格、流动性、FDV / 市值、24H 成交额、买卖结构和涨跌幅
- 如果合约里存在公开扩展字段，例如 `owner()`、`peakPrice()`、`isStart()` 这类方法，也会自动展示

## 数据来源

- BNB Chain 公共 RPC：读取 ERC-20 基础链上数据
- DexScreener API：读取主交易对市场数据
- 页面不依赖打包器，直接浏览器打开即可运行

## 使用方式

直接在浏览器打开 [index.html](/D:/little%20boy/index.html) 即可。

如果浏览器对 `file://` 下的远程请求比较严格，可以在当前目录启动一个静态服务：

```powershell
python -m http.server 8080
```

然后访问 [http://localhost:8080](http://localhost:8080)。

## 当前范围

- 当前模板先支持 `BNB Chain`
- 当前输入先支持 `合约地址` 与 `BscScan 链接`
- 如果你要，我可以继续把它扩成 `多链版本`，再加链选择器
