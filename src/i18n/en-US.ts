import type { PagePath } from "./pagePath";

import _global from "@i18n/en-US/$.json";
import _index from "@i18n/en-US/_.json";
import _chatgpt from "@i18n/en-US/_chatgpt.json";
import _chatgptStartlingByEachStep from "@i18n/en-US/_click-flow.json";
import _chatgptStartlingByEachStepDetail from "@i18n/en-US/click-flow/$.json";

export type GlobalKey = keyof typeof _global;
const pages = {
  "/": _index,
  "/chatgpt/": _chatgpt,
  "/click-flow/": _chatgptStartlingByEachStep,
  "/click-flow/$": _chatgptStartlingByEachStepDetail,
} satisfies Record<PagePath, any>;
export type PageKey<P extends PagePath> = keyof (typeof pages)[P];

const i18nDataEnUS = {
  "*": _global,
  ...pages,
};
export default i18nDataEnUS;
