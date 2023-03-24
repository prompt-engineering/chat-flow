export enum MsgType {
  None = "none",
  ERROR = "error",
  RUNNING = "running",

  UNIT_SERVER = "unit_server",
}

export interface ReplResult {
  id: number;
  resultValue: string;
  className: string;
  msgType: MsgType;
  content: UnitServerContent | ErrorContent;
}

export interface ErrorContent {
  exception: string;
  message: string;
}

export interface UnitServerContent {
  url: string;
}
