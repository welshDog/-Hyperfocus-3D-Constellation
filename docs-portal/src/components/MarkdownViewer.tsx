import { marked } from 'marked';

export function MarkdownViewer({ content }: { content: string }) {
  const html = marked.parse(content);
  return <div className="text-sm leading-6" dangerouslySetInnerHTML={{ __html: html }} />;
}
