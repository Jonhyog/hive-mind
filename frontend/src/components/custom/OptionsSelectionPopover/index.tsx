import { useContext, useMemo } from "react";

import { Router } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useGetHives from "@/hooks/useGetHives";
import useGetSensors, {
  AllowedMetrics,
  GetSensorsVariables,
} from "@/hooks/useGetSensors";

import { HiveContext } from "../HiveProvider";
import ContextSelector from "../ContextSelector";
import { SensorContext } from "../SensorProvider";
import TranslatedText from "../TranslatedText";

const avaliableMetrics = [
  "temperature",
  "pressure",
  "umidity",
  "noise",
] as AllowedMetrics[];

const getHivesOptions = {};

const OptionsSelectionPopover = (): JSX.Element => {
  const { hive, setHiveContext } = useContext(HiveContext);
  const { temperature, pressure, humidity, noise, setSensorContext } =
    useContext(SensorContext);
  const hivesData = useGetHives(getHivesOptions);

  const sensorQueryOptions = useMemo((): GetSensorsVariables => {
    return {
      hiveId: hive,
    };
  }, [hive]);
  const sensorsData = useGetSensors(sensorQueryOptions);
  const sensorOptions = useMemo(() => {
    return Object.fromEntries(
      avaliableMetrics.map((key) => [
        key,
        sensorsData
          .filter((element) => element.metricsType.includes(key))
          .map((element) => ({ value: element.sensorId, label: element.description })),
      ])
    );
  }, [sensorsData]);

  const hiveOptions = useMemo(
    () => hivesData.map((element) => ({ value: element.hiveId, label: element.description ?? "" })),
    [hivesData]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Router />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4">
        <div className="grid gap-2 divide-y divide-dashed">
          <div className="flex flex-col pb-4 gap-1">
            <div className="space-y-1">
              <h4 className="font-medium leading-none">
              <TranslatedText path="quickConfig.title" />:
              </h4>
              <p className="text-sm text-muted-foreground">
              <TranslatedText path="quickConfig.description" />
              </p>
            </div>
          </div>
          <div className="flex flex-col py-4 gap-2">
            <div className="flex flex-col gap-1">
              <h4 className="font-medium leading-none"><TranslatedText path="quickConfig.hives" />:</h4>
              <ContextSelector
                options={hiveOptions}
                selected={hive ?? ""}
                onSelect={setHiveContext}
              />
            </div>
          </div>
          <div className="flex flex-col pt-4 gap-2">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium leading-none"><TranslatedText path="quickConfig.sensors" />:</h4>
              <ContextSelector
                label="graphs.temperature"
                options={sensorOptions.temperature}
                selected={temperature ?? ""}
                onSelect={setSensorContext?.setTemperature}
              />
              <ContextSelector
                label="graphs.pressure"
                options={sensorOptions.pressure}
                selected={pressure ?? ""}
                onSelect={setSensorContext?.setPressure}
              />
              <ContextSelector
                label="graphs.humidity"
                options={sensorOptions.umidity}
                selected={humidity ?? ""}
                onSelect={setSensorContext?.setHumidity}
              />
              <ContextSelector
                label="graphs.noise"
                options={sensorOptions.noise}
                selected={noise ?? ""}
                onSelect={setSensorContext?.setNoise}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OptionsSelectionPopover;
