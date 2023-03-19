# ChatFlow - Personalize your ChatGPT workflows and build the road to automation

[![ci](https://github.com/prompt-engineering/chat-flow/actions/workflows/ci.yaml/badge.svg)](https://github.com/prompt-engineering/chat-flow/actions/workflows/ci.yaml)
![GitHub](https://img.shields.io/github/license/prompt-engineering/chat-flow)
[![Discord](https://img.shields.io/discord/1082563233593966612)](https://discord.gg/FSWXq4DmEj)

Screenshots:

![](docs/screenshot.jpeg)

English | [简体中文](./README.zh-CN.md)

Online Demo: https://prompt.phodal.com/

Join us:

[![Chat Server](https://img.shields.io/badge/chat-discord-7289da.svg)](https://discord.gg/FSWXq4DmEj)

# Deploy ChatFlow on Vercel with Planetscale

Follow these steps to deploy ChatFlow on Vercel with a serverless MySQL database provided by Planetscale:

1.  Clone the [ChatFlow template](https://github.com/prompt-engineering/chat-flow) from GitHub.
2.  Create a Vercel account and connect it to your GitHub account.
3.  Create a [Planetscale](https://app.planetscale.com) account.
4.  Set up your Planetscale database:
    1.  Log in to your Planetscale account with `pscale auth login`.
    2.  Create a password with `pscale password create <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_NAME>`.
    3.  Push your database to Planetscale with `npx prisma db push`.
5.  Configure your Vercel environment:
    - Set `DATABASE_URL` to your Planetscale database URL.
    - Generate an encryption key with `node scripts/gen-enc.js` and set it as `ENC_KEY`.

With these steps completed, your ChatFlow will be deployed on Vercel with a Planetscale serverless MySQL database.

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
