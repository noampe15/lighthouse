import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Shell } from "./components/Shell";
import { moduleById } from "./nav";
import { AgentPlaceholder, RequestPlaceholder } from "./pages/RecordPlaceholder";
import { ModulePlaceholder } from "./pages/ModulePlaceholder";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SessionProvider } from "./session";

export function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Navigate to="/requests" replace />} />
            <Route
              path="requests"
              element={<ModulePlaceholder title="Requests" phase={moduleById("requests").phase} />}
            />
            <Route path="requests/:id" element={<RequestPlaceholder />} />
            <Route
              path="agents"
              element={<ModulePlaceholder title="Agents" phase={moduleById("agents").phase} />}
            />
            <Route path="agents/:id" element={<AgentPlaceholder />} />
            <Route
              path="policies"
              element={<ModulePlaceholder title="Policies" phase={moduleById("policies").phase} />}
            />
            <Route
              path="activity"
              element={<ModulePlaceholder title="Activity" phase={moduleById("activity").phase} />}
            />
            <Route
              path="integrations"
              element={
                <ModulePlaceholder title="Integrations" phase={moduleById("integrations").phase} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
}
