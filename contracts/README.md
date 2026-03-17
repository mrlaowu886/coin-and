# ContributionToken（BSC）

`ContributionToken.sol` 是当前项目使用的贡献值合约（可升级、不可转让）。

## 规则摘要
- 每个地址仅能 `claim` 一次，默认领取 `100`
- 成功邀请定义：被邀请人领取成功即成立，邀请人默认奖励 `50`
- Token 不可转账、不可授权，只允许 `mint/burn`
- 未来“挖矿”可通过 `burn` 或 `burnByModule` 销毁贡献值

## 关键接口
- `initialize(name, symbol, admin)`
- `claim(referrer)`
- `burn(amount)`
- `burnByModule(user, amount)`
- `hasClaimed(user)` / `inviterOf(user)` / `inviteCount(user)`

## 权限角色
- `DEFAULT_ADMIN_ROLE`
- `PAUSER_ROLE`
- `UPGRADER_ROLE`
- `MINING_ROLE`

建议把 `DEFAULT_ADMIN_ROLE` 和 `UPGRADER_ROLE` 配置到多签地址。

## 前端接入说明
1. 部署代理合约后，复制代理地址（不是 implementation 地址）
2. 打开页面，把代理地址填到“合约地址”输入框并点“保存合约地址”
3. 用户连接 BSC 钱包后可执行领取，领取成功后会自动生成邀请链接

## 编译与部署建议
当前仓库未内置 Node/Hardhat 依赖。推荐两种方式：
- 方式 A：使用 Remix + OpenZeppelin Upgrades 插件部署 UUPS 代理
- 方式 B：本地自行初始化 Hardhat/Foundry 后部署

> 注意：主网上线前请至少做一轮测试网验证（claim、invite、burn、pause、upgrade）。
