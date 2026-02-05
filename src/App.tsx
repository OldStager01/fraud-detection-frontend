import { AppProviders } from "@/components/providers";

function AppContent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          Fintech Risk Engine
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Core infrastructure complete. Ready for Step 3.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <span className="badge-success">Redux ✓</span>
          <span className="badge-success">React Query ✓</span>
          <span className="badge-success">Axios ✓</span>
          <span className="badge-success">Error Boundary ✓</span>
          <span className="badge-success">UI Components ✓</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;
