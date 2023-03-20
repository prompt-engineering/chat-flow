export enum ActionType {
  CREATE_REPO = "create_repo",
  CREATE_SCAN = "create_scan",
  GRAPH = "graph",
}

export interface ReactiveAction {
  actionType: ActionType;
  className: string;
  graphType: GraphType;
  data: string;
}

export enum MsgType {
  None = "none",
  ERROR = "error",
  ARCHGUARD_GRAPH = "archguard_graph",
}

export interface ReplResult {
  id: number;
  resultValue: string;
  className: string;
  msgType: MsgType;
  content: object;
  action: ReactiveAction;
}

export interface ErrorContent {
  exception: string;
  message: string;
}

export interface CellItem {
  id: string;
  code: string;
}

export enum GraphType {
  UML = "uml",
  FLOWCHART = "flowchart",
  ARCHDOC = "archdoc",
}

export interface ScanModel {
  name: string;
  branch: string;
  features: string[];
  languages: string[];
  specs: string[];
  types: string[];
}
