export function Markdown({ html }: { html: string }) {
  return <div className="prose-page" dangerouslySetInnerHTML={{ __html: html }} />;
}
