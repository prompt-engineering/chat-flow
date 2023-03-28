export enum MsgType {
  None = "none",
  ERROR = "error",
  RUNNING = "running",
  UNIT_SERVER = "unit_server",
  REACT_BUNDLE = "react_bundle",
}

export interface ReplResult {
  id: number;
  resultValue: string;
  className: string;
  msgType: MsgType;
  content: UnitServerContent | ErrorContent | ReactBundleContent;
}

export interface ReactBundleContent {
  react: string;
  reactDom: string;
  thirdParty: string[];
}

export interface ErrorContent {
  exception: string;
  message: string;
}

export interface UnitServerContent {
  url: string;
}
