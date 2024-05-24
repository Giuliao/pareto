import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HelmetProvider, ParetoPage } from "@pareto/core";
import superjson from 'superjson';
import { PageContext } from "@pareto/core/client";

const startApp = async (Page: ParetoPage) => {
  const root = document.getElementById("main") as HTMLElement;
  const __INITIAL_DATA__ =  superjson.parse(window.__INITIAL_DATA__) as Record<string, any>;
  await Page.setUpClient?.();

  hydrateRoot(
    root,
    <StrictMode>
      <PageContext>
        <Page initialData={__INITIAL_DATA__} />
      </PageContext>
    </StrictMode>
  );
};
export { startApp };
