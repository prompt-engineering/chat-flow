import { ReplResult } from "@/flows/unitmesh/ascode";
import { Link, Text } from "@chakra-ui/react";
import React from "react";

export function UnitServerRenderer(result: ReplResult) {
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
