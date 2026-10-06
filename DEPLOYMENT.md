# 发布状态

更新时间：2026-10-06（北京时间）。

- GitHub 仓库：`Goff-code/xiangyang-website`。项目负责人于 2026-10-06 授权改为 Public，供创始人及其 Agent 读取和审阅。
- 发布内容：仅 `public/` 目录。
- 公开网站：当前尚未在 GitHub Pages 上启用。
- 当前安排：只公开仓库并提供本地预览说明，不启用 Pages，不运行发布工作流；等待会员学习与收获案例后继续迭代。

历史记录：2026-10-02 仓库仍为私有时，Pages 创建接口返回 HTTP 422，提示当时账户套餐不支持该私有仓库。项目随后仅完成备份并暂停部署。本项目没有升级套餐或产生付费订阅。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## 以后获准发布网站时

1. 先确认项目负责人要求发布及应公开的内容，再在 Settings → Pages 中将 Source 设置为 GitHub Actions。
2. 在 Actions → Deploy GitHub Pages → Run workflow 中选择 `main` 运行。
3. 等待工作流成功，以 GitHub Pages 设置页返回的网站地址为准。
4. 核对公开网页、静态图片、微信复制与二维码，并确认只有 `public/` 中的文件被部署到网站。

部署工作流目前仅支持手动运行，普通提交不会触发部署。完成首次发布后，再按项目负责人要求决定是否添加自动部署。

## 安全约束

公开仓库意味着源码、维护说明和 Git 历史均可读取。不得提交密码、密钥、私人账户配置、临时日志或无关个人资料。已授权公开的网站联系微信与二维码保留在页面中。

GitHub Actions 的工作流固定使用 GitHub 官方 action 的提交版本，并通过同一并发组串行部署。上传的构件仅含 `public/`，不包含仓库说明、素材来源文档或 Git 历史。
