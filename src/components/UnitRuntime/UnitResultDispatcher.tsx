import React from "react";

import { MsgType, ReactBundleContent, ReplResult } from "@/flows/unitmesh/ascode";
import { Textarea } from "@chakra-ui/react";
import ReactRenderer from "./renderer/ReactRenderer";
import { UnitServerRenderer } from "@/components/UnitRuntime/renderer/UnitServerRenderer";

export function UnitResultDispatcher(result: ReplResult) {
  const isReturnUrl = result.content && result.content.hasOwnProperty("url");
  if (isReturnUrl) {
    return UnitServerRenderer(result);
  }

  if (result.msgType == MsgType.REACT_BUNDLE) {
    return (
      <div>
        <ReactRenderer code={result.resultValue} bundle_scripts={result.content as ReactBundleContent} />
      </div>
    );
  }

  return <Textarea defaultValue={JSON.stringify(result)}></Textarea>;
}
