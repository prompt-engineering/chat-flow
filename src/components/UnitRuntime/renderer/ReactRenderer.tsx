import React, { useEffect, useRef } from "react";
import { ReactBundleContent } from "@/flows/unitmesh/ascode";

type ReactRendererParams = { code: string; bundle_scripts: ReactBundleContent };

function ReactRenderer({ code, bundle_scripts }: ReactRendererParams) {
  const iframe$ = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (iframe$.current && code) {
      const ifr = iframe$.current;
      const reactLoaderScript = document.createElement("script");
      const reactDomLoaderScript = document.createElement("script");
      reactLoaderScript.src = bundle_scripts.react;
      reactDomLoaderScript.src = bundle_scripts.reactDom;

      // create div#root
      const rootDom = document.createElement("div");
      rootDom.id = "root";
      ifr?.contentDocument?.body.append(rootDom);

      const script = document.createElement("script");
      script.innerHTML = code;
      reactLoaderScript.onload = () => {
        reactDomLoaderScript.onload = () => {
          ifr?.contentDocument?.body.append(script);
        };

        ifr?.contentDocument?.body.append(reactDomLoaderScript);
      };
      ifr?.contentDocument?.body.append(reactLoaderScript);

      return () => {
        if (ifr?.contentDocument?.body) {
          ifr.contentDocument.body.innerHTML = "";
        }
      };
    }
  }, [code]);

  return <iframe ref={iframe$} style={{ width: "100%" }}></iframe>;
}

export default ReactRenderer;
