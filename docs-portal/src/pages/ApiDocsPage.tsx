import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export function ApiDocsPage({ specUrl }: { specUrl: string }) {
  return (
    <div className="bg-surface p-4 rounded">
      <SwaggerUI url={specUrl} />
    </div>
  );
}
