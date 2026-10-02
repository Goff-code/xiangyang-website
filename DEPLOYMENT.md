# 发布状态

更新时间：2026-10-02（北京时间）。

- GitHub 仓库：`Goff-code/xiangyang-website`，必须保持 Private。
- 发布内容：仅 `public/` 目录。
- 公开网站：当前尚未在 GitHub Pages 上启用。
- 阻断原因：GitHub Pages 创建接口返回 HTTP 422，提示当前套餐不支持此私有仓库的 Pages。

GitHub Free 不支持从私有仓库发布 Pages；个人账户使用 GitHub Pro 可从私有仓库发布公开网页。账户套餐、额度和费用以 GitHub 实时设置为准。本项目没有升级套餐或产生付费订阅。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## 账户支持私有仓库 Pages 后

1. 保持仓库可见性为 Private，在 Settings → Pages 中将 Source 设置为 GitHub Actions。
2. 在 Actions → Deploy GitHub Pages → Run workflow 中选择 `main` 运行。
3. 等待工作流成功，以 GitHub Pages 设置页返回的网站地址为准。
4. 核对公开网页、静态图片、微信复制与二维码，并确认维护文档没有被发布。

部署工作流目前仅支持手动运行，避免在套餐不支持时每次提交触发失败。确认 Pages 可用且完成首次发布后，可以添加 `push` 到 `main` 的自动部署触发器。

## 安全约束

不要通过公开源码仓库来解决套餐限制。若选择其他托管平台，继续使用当前私有仓库，公开产物仍限于 `public/`。所有访客可下载浏览器收到的网页资源；仓库设为私有不能隐藏已发布的前端资源。

GitHub Actions 的工作流固定使用 GitHub 官方 action 的提交版本，并通过同一并发组串行部署。上传的构件仅含 `public/`，不包含仓库说明、素材来源文档或 Git 历史。
