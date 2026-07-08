import IntegrationCard from "../features/integrations/IntegrationCard";
import { mockIntegrations } from "../mocks/integration.mock";

export default function Integrations() {
  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6 font-sans bg-background">
      <div className="flex items-center justify-between select-none">
        <div>
          <h1 className="text-[20px] font-bold text-text-primary">Integrations</h1>
          <p className="text-[12px] text-text-secondary mt-0.5">Connect external platforms and developer productivity tool suites.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mockIntegrations.map((item) => (
          <IntegrationCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
