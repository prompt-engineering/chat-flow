# ChatFlow - 打造个性化 ChatGPT 流程，构建自动化之路

[![ci](https://github.com/prompt-engineering/chat-flow/actions/workflows/ci.yaml/badge.svg)](https://github.com/prompt-engineering/chat-flow/actions/workflows/ci.yaml)
![GitHub](https://img.shields.io/github/license/prompt-engineering/chat-flow)

Screenshots:

![](docs/screenshot.jpeg)

Online Demo: https://prompt.phodal.com/

[English](./README.md) | 简体中文

# 在 Vercel 上部署 ChatFlow，使用 Planetscale

按照以下步骤，在 Vercel 上部署 ChatFlow，使用由 Planetscale 提供的无服务器 MySQL 数据库：

1.  从 GitHub 克隆 [ChatFlow 模板](https://github.com/prompt-engineering/chat-flow)。
2.  创建 Vercel 帐户，并将其连接到 GitHub 帐户。
3.  创建 [Planetscale](https://app.planetscale.com) 帐户。
4.  设置 Planetscale 数据库：
    1.  使用 `pscale auth login` 登录 Planetscale 帐户。
    2.  使用 `pscale password create <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_NAME>` 创建密码。
    3.  使用 `npx prisma db push` 将数据库推送到 Planetscale。
5.  配置 Vercel 环境：
    - 将 `DATABASE_URL` 设置为 Planetscale 数据库的 URL。
    - 使用 `node scripts/gen-enc.js` 生成加密密钥，并将其设置为 `ENC_KEY`。

完成这些步骤后，您的 ChatFlow 将在 Vercel 上部署，并使用 Planetscale 的无服务器 MySQL 数据库。

# Development

Technical documentation:

- Flowchart
  - DotParser, parse dot file to graph data
  - dagre, layout graph data
  - ReactFlow, render graph data
- Flow Functions
  - jsonpath-plus, parse jsonpath
  - expr-eval, parse expression
- Flow Components
  - JsonViewer, render json data
  - DataTable, render table data
- Others
  - MarkdownViewer, render markdown data

## LICENSE

This code is distributed under the MIT license. See [LICENSE](./LICENSE) in this directory.
