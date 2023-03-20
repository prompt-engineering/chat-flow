import { unified } from "unified";
import remarkParse from "remark-parse";
import { Node } from "unist";

/**
 * Parses a markdown file and returns the code blocks
 * @param markdown
 * @returns {CodeBlock[]} code blocks
 * @example
 * const markdown = `
 * # Title
 *
 * \`\`\`js
 * const a = 1;
 * \`\`\`
 *
 * \`\`\`js
 * const b = 2;
 * \`\`\`
 * `;
 *
 * const codeBlocks = getCodeBlocksFromMarkdown(markdown);
 * // codeBlocks = ["const a = 1;", "const b = 2;"]
 *
 */
export async function codeFromMarkdown(markdown: string): Promise<CodeBlock[]> {
  const ast = await unified().use(remarkParse).parse(markdown);

  const codeBlocks: CodeBlock[] = [];

  ast.children.forEach((node) => {
    if (node.type === "code") {
      const codeNode = node as Node & { lang: string; value: string };
      codeBlocks.push({
        lang: codeNode.lang,
        code: codeNode.value,
      });
    }
  });

  return codeBlocks;
}

export type CodeBlock = {
  lang: string;
  code: string;
};
