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
          .map((element) => element.sensorId),
      ])
    );
  }, [sensorsData]);

  const hiveOptions = useMemo(
    () => hivesData.map((element) => element.hiveId),
    [hivesData]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Router />
          {/* Preview Configuration */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4">
        <div className="grid gap-2 divide-y divide-dashed">
          <div className="flex flex-col pb-4 gap-1">
            <div className="space-y-1">
              <h4 className="font-medium leading-none">
                Preview Configuration:
              </h4>
              <p className="text-sm text-muted-foreground">
                Select hives and sensors you want to monitor and see in realtime
                how they behave.
              </p>
            </div>
          </div>
          <div className="flex flex-col py-4 gap-2">
            <div className="flex flex-col gap-1">
              <h4 className="font-medium leading-none">Hives:</h4>
              <ContextSelector
                options={hiveOptions}
                selected={hive ?? ""}
                onSelect={setHiveContext}
              />
            </div>
          </div>
          <div className="flex flex-col pt-4 gap-2">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium leading-none">Sensors:</h4>
              <ContextSelector
                label="Temperature:"
                options={sensorOptions.temperature}
                selected={temperature ?? ""}
                onSelect={setSensorContext?.setTemperature}
              />
              <ContextSelector
                label="Pressure:"
                options={sensorOptions.pressure}
                selected={pressure ?? ""}
                onSelect={setSensorContext?.setPressure}
              />
              <ContextSelector
                label="Humidity:"
                options={sensorOptions.umidity}
                selected={humidity ?? ""}
                onSelect={setSensorContext?.setHumidity}
              />
              <ContextSelector
                label="Noise:"
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
