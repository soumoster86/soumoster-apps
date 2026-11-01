import { remark } from "remark";
import remarkHtml from "remark-html";

export async function renderMarkdown(markdown: string) {
  const file = await remark().use(remarkHtml).process(markdown);
  return String(file);
}
