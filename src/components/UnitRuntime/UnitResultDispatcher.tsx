import React from "react";

import { MsgType, ReactBundleContent, ReplResult } from "@/flows/unitmesh/ascode";
import { Link, Text, Textarea } from "@chakra-ui/react";
import ReactRenderer from "./renderer/ReactRenderer";

export function UnitResultDispatcher(result: ReplResult) {
  const isReturnUrl = result.content && result.content.hasOwnProperty("url");
  if (isReturnUrl) {
    const url = (result.content as any)["url"];
    return (
      <Text>
        Online URL:{" "}
        <Link href={url} isExternal={true}>
          {url}
        </Link>
      </Text>
    );
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
