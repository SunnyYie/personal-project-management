import { useState, useEffect, useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hexToRgb, hsbToRgb, rgbToHex, rgbToHsb } from "./util";

const presetColors = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
  "#C0C0C0",
  "#808080",
  "#800000",
  "#808000",
  "#008000",
  "#800080",
  "#008080",
  "#000080",
];

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

export function ColorPicker({ value = "#000000", onChange }: ColorPickerProps) {
  const [color, setColor] = useState<string>();
  const [rgb, setRgb] = useState<[number, number, number]>(hexToRgb(value));
  const [hsb, setHsb] = useState<[number, number, number]>(rgbToHsb(...rgb));
  const [alpha, setAlpha] = useState(100);
  const [recentColors, setRecentColors] = useState<string[]>([]);

  useEffect(() => {
    setColor(value);
    setRgb(hexToRgb(color ?? value));
    setHsb(rgbToHsb(...hexToRgb(color ?? value)));
  }, [color]);

  const handleColorChange = useCallback(
    (newColor: string) => {
      setColor(newColor);
      onChange?.(newColor);
      setRecentColors((prev) =>
        [newColor, ...prev.filter((c) => c !== newColor)].slice(0, 8)
      );
    },
    [onChange]
  );

  const handleHueChange = useCallback(
    (hue: number) => {
      const [, s, b] = hsb;
      const [r, g, b_] = hsbToRgb(hue, s, b);
      handleColorChange(rgbToHex(r, g, b_));
    },
    [hsb, handleColorChange]
  );

  const handleSaturationBrightnessChange = useCallback(
    (saturation: number, brightness: number) => {
      const [h] = hsb;
      const [r, g, b] = hsbToRgb(h, saturation, brightness);
      handleColorChange(rgbToHex(r, g, b));
    },
    [hsb, handleColorChange]
  );

  const handleAlphaChange = useCallback((newAlpha: number) => {
    setAlpha(newAlpha);
  }, []);

  const ColorPanel = () => (
    <div
      className="w-full h-40 relative"
      style={{ backgroundColor: `hsl(${hsb[0]}, 100%, 50%)` }}
    >
      <div
        className="w-full h-full"
        style={{
          background:
            "linear-gradient(to right, #fff, transparent), linear-gradient(to top, #000, transparent)",
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          handleSaturationBrightnessChange(
            (x / rect.width) * 100,
            100 - (y / rect.height) * 100
          );
        }}
      >
        <div
          className="w-3 h-3 rounded-full border-2 border-white absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${hsb[1]}%`,
            top: `${100 - hsb[2]}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-start text-left font-normal"
        >
          <div
            className="w-4 h-4 rounded-sm mr-2"
            style={{ backgroundColor: color }}
          />
          {color}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ColorPanel />
        <Slider
          min={0}
          max={360}
          step={1}
          value={[hsb[0]]}
          onValueChange={([value]) => handleHueChange(value)}
          className="mt-4"
        />
        <Slider
          min={0}
          max={100}
          step={1}
          value={[alpha]}
          onValueChange={([value]) => handleAlphaChange(value)}
          className="mt-4"
        />
        <Tabs defaultValue="hex" className="mt-4">
          <TabsList>
            <TabsTrigger value="hex">HEX</TabsTrigger>
            <TabsTrigger value="rgb">RGB</TabsTrigger>
            <TabsTrigger value="hsb">HSB</TabsTrigger>
          </TabsList>
          <TabsContent value="hex">
            <Input
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
            />
          </TabsContent>
          <TabsContent value="rgb">
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                max={255}
                value={rgb[0]}
                onChange={(e) => {
                  const [, g, b] = rgb;
                  handleColorChange(rgbToHex(Number(e.target.value), g, b));
                }}
              />
              <Input
                type="number"
                min={0}
                max={255}
                value={rgb[1]}
                onChange={(e) => {
                  const [r, , b] = rgb;
                  handleColorChange(rgbToHex(r, Number(e.target.value), b));
                }}
              />
              <Input
                type="number"
                min={0}
                max={255}
                value={rgb[2]}
                onChange={(e) => {
                  const [r, g] = rgb;
                  handleColorChange(rgbToHex(r, g, Number(e.target.value)));
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="hsb">
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                max={360}
                value={hsb[0]}
                onChange={(e) => handleHueChange(Number(e.target.value))}
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={hsb[1]}
                onChange={(e) =>
                  handleSaturationBrightnessChange(
                    Number(e.target.value),
                    hsb[2]
                  )
                }
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={hsb[2]}
                onChange={(e) =>
                  handleSaturationBrightnessChange(
                    hsb[1],
                    Number(e.target.value)
                  )
                }
              />
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4">
          <Label>Preset Colors</Label>
          <div className="grid grid-cols-8 gap-2 mt-2">
            {presetColors.map((presetColor) => (
              <Button
                key={presetColor}
                className="w-6 h-6 p-0"
                style={{ backgroundColor: presetColor }}
                onClick={() => handleColorChange(presetColor)}
              />
            ))}
          </div>
        </div>
        {recentColors.length > 0 && (
          <div className="mt-4">
            <Label>Recent Colors</Label>
            <div className="grid grid-cols-8 gap-2 mt-2">
              {recentColors.map((recentColor) => (
                <Button
                  key={recentColor}
                  className="w-6 h-6 p-0"
                  style={{ backgroundColor: recentColor }}
                  onClick={() => handleColorChange(recentColor)}
                />
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
