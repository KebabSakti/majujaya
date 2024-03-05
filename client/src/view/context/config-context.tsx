import { createContext, useEffect, useState } from "react";
import { Empty } from "../../lib/config/type";
import ConfigRepository from "../../lib/repository/config-repository";
import { Spinner } from "flowbite-react";

const configRepository = new ConfigRepository();
export const ConfigContext = createContext<Record<string, any> | Empty>(null);

export function ConfigProvider({ children }: any) {
  const [config, setConfig] = useState<Record<string, any>>({
    status: "loading",
    data: null,
  });

  async function init() {
    try {
      setConfig({ ...config, status: "loading" });
      const result = await configRepository.index();

      setConfig({
        ...config,
        status: "loaded",
        data: result,
        error: null,
      });
    } catch (error: any) {
      setConfig({ ...config, status: "error", error: error });
    }
  }

  function getConfig(id: string): Record<string, any> | Empty {
    if (config.data) {
      const configItem = config.data.data.find((e: any) => e.id == id);

      return configItem;
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, getConfig }}>
      {(() => {
        if (config.status == "loading") {
          return (
            <div className="h-screen w-full flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          );
        }

        return children;
      })()}
    </ConfigContext.Provider>
  );
}
