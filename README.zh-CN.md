# ChatFlow - 打造个性化 ChatGPT 流程，构建自动化之路

[![ci](https://github.com/prompt-engineering/chat-flow/actions/workflows/ci.yaml/badge.svg)](https://github.com/prompt-engineering/chat-flow/actions/workflows/ci.yaml)
![GitHub](https://img.shields.io/github/license/prompt-engineering/chat-flow)

Screenshots:

![](docs/screenshot.jpeg)

[English](./README.md) | 简体中文

# 部署 ChatFlow

要求：

1.  从 Github 上使用 [ChatFlow](https://github.com/prompt-engineering/chat-flow) 作为模板。
2.  创建 Vercel 帐户，并连接到 GitHub。
3.  创建 [Planetscale](https://app.planetscale.com) 帐户，用于 Serverless MySQL。
4.  设置数据库和分支：
    1.  运行 `pscale auth login` 命令登录 Planetscale 帐户。
    2.  运行 `pscale password create <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_NAME>` 命令创建密码。
    3.  运行 `npx prisma db push` 命令以将数据库推送到 Planetscale。

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

## 使用

1. 登录到您的 Vercel 帐户并单击 “New Project”。
2. 选择您的 Git 代码仓库，其中存储着您的 Next.js 应用程序。
3. Vercel 将自动检测到它是一个 Next.js 应用程序，并配置构建设置。

## LICENSE

This code is distributed under the MIT license. See [LICENSE](./LICENSE) in this directory.
