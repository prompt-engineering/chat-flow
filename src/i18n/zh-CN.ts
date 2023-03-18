import type { PagePath } from "./pagePath";

import _global from "@i18n/zh-CN/$.json";
import _index from "@i18n/zh-CN/_.json";
import _chatgpt from "@i18n/zh-CN/_chatgpt.json";
import _chatgptStartlingByEachStep from "@i18n/zh-CN/_click-flow.json";
import _chatgptStartlingByEachStepDetail from "@i18n/zh-CN/click-flow/$.json";

export type GlobalKey = keyof typeof _global;
const pages = {
  "/": _index,
  "/chatgpt/": _chatgpt,
  "/click-flow/": _chatgptStartlingByEachStep,
  "/click-flow/$": _chatgptStartlingByEachStepDetail,
} satisfies Record<PagePath, any>;
export type PageKey<P extends PagePath> = keyof (typeof pages)[P];

const i18nDataZhCN = {
  "*": _global,
  ...pages,
};
export default i18nDataZhCN;
