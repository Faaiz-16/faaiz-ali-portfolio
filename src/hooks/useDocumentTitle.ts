import { useEffect } from 'react';

function setMetaContent(selector: string, content: string): void {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

export function useDocumentTitle(title: string, description?: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[name="twitter:title"]', title);

    if (description) {
      setMetaContent('meta[name="description"]', description);
      setMetaContent('meta[property="og:description"]', description);
      setMetaContent('meta[name="twitter:description"]', description);
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title, description]);
}
