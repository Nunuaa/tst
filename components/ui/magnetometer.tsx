import React, { useState, useEffect, useRef } from "react";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface MagnetometerProps {
  size?: number;
  showValue?: boolean;
  showDirection?: boolean;
  className?: string;
}

interface MagnetometerReading {
  x: number;
  y: number;
  z: number;
  heading: number;
}

const Magnetometer: React.FC<MagnetometerProps> = ({
  size = 200,
  showValue = true,
  showDirection = true,
  className,
}) => {
  const [reading, setReading] = useState<MagnetometerReading>({
    x: 0,
    y: 0,
    z: 0,
    heading: 0,
  });
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isPermissionGranted, setIsPermissionGranted] = useState<boolean>(true);
  const gaugeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Check if the Magnetometer API is supported
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false);
      return;
    }

    const handlePermission = () => {
      // Request permission for iOS 13+ devices
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((response: string) => {
            if (response === "granted") {
              setIsPermissionGranted(true);
              window.addEventListener("deviceorientation", handleOrientation);
            } else {
              setIsPermissionGranted(false);
            }
          })
          .catch(() => {
            setIsPermissionGranted(false);
          });
      } else {
        // For non-iOS devices or older iOS versions
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // Alpha is the compass direction (0-360)
        const heading = Math.round(event.alpha);
        
        // Simulate magnetometer readings based on orientation
        // In a real app, you'd use the Magnetometer API if available
        const x = Math.sin(heading * (Math.PI / 180)) * 100;
        const y = Math.cos(heading * (Math.PI / 180)) * 100;
        const z = Math.random() * 20 - 10; // Random z value for demonstration
        
        setReading({
          x: Math.round(x),
          y: Math.round(y),
          z: Math.round(z),
          heading,
        });
      }
    };

    // Try to start listening for orientation events
    handlePermission();

    // Cleanup
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Calculate the rotation for the compass needle
  const needleRotation = `rotate(${reading.heading}deg)`;

  // Get cardinal direction
  const getCardinalDirection = (heading: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  };

  if (!isSupported) {
    return (
      <div className="flex flex-col items-center justify-center p-4 border border-border rounded-lg bg-background text-foreground">
        <Compass size={size / 2} className="text-muted-foreground mb-2" />
        <p className="text-center text-sm">当前设备不支持磁力计</p>
      </div>
    );
  }

  if (!isPermissionGranted) {
    return (
      <div className="flex flex-col items-center justify-center p-4 border border-border rounded-lg bg-background text-foreground">
        <Compass size={size / 2} className="text-muted-foreground mb-2" />
        <p className="text-center text-sm">磁力计权限被拒绝</p>
      </div>
    );
  }

  const circleSize = size;
  const radius = circleSize / 2 - 10;
  const strokeWidth = 10;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        <svg
          ref={gaugeRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${circleSize} ${circleSize}`}
          width={size}
          height={size}
          className="relative"
        >
          {/* Outer circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted-foreground opacity-20"
          />

          {/* Cardinal direction markers */}
          {["N", "E", "S", "W"].map((dir, i) => {
            const angle = i * 90;
            const x = circleSize / 2 + Math.sin(angle * (Math.PI / 180)) * (radius - 15);
            const y = circleSize / 2 - Math.cos(angle * (Math.PI / 180)) * (radius - 15);
            return (
              <text
                key={dir}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size / 15}
                fill="currentColor"
                className="font-bold"
              >
                {dir}
              </text>
            );
          })}

          {/* Degree markers */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = i * 10;
            const isMainMarker = i % 9 === 0;
            const markerLength = isMainMarker ? 10 : 5;
            const outerX = circleSize / 2 + Math.sin(angle * (Math.PI / 180)) * radius;
            const outerY = circleSize / 2 - Math.cos(angle * (Math.PI / 180)) * radius;
            const innerX = circleSize / 2 + Math.sin(angle * (Math.PI / 180)) * (radius - markerLength);
            const innerY = circleSize / 2 - Math.cos(angle * (Math.PI / 180)) * (radius - markerLength);

            return (
              <line
                key={i}
                x1={outerX}
                y1={outerY}
                x2={innerX}
                y2={innerY}
                stroke="currentColor"
                strokeWidth={isMainMarker ? 2 : 1}
                className={isMainMarker ? "text-foreground" : "text-muted-foreground"}
              />
            );
          })}

          {/* Compass needle */}
          <g
            transform={`rotate(${reading.heading}, ${circleSize / 2}, ${circleSize / 2})`}
            style={{ transformOrigin: "center" }}
          >
            <line
              x1={circleSize / 2}
              y1={circleSize / 2}
              x2={circleSize / 2}
              y2={circleSize / 2 - radius + 20}
              stroke="#dc2626"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <line
              x1={circleSize / 2}
              y1={circleSize / 2}
              x2={circleSize / 2}
              y2={circleSize / 2 + radius - 40}
              stroke="#3b82f6"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={size / 20}
              fill="currentColor"
              className="text-foreground"
            />
          </g>

          {/* Heading value */}
          {showValue && (
            <text
              x={circleSize / 2}
              y={circleSize / 2 + radius / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size / 10}
              fill="currentColor"
              className="font-semibold"
            >
              {reading.heading}°
            </text>
          )}
        </svg>

        {/* Direction indicator */}
        {showDirection && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-full px-3 py-1 text-sm font-medium">
            {getCardinalDirection(reading.heading)}
          </div>
        )}
      </div>

      {/* Magnetometer readings */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">X轴</span>
          <span className="font-medium">{reading.x}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Y轴</span>
          <span className="font-medium">{reading.y}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Z轴</span>
          <span className="font-medium">{reading.z}</span>
        </div>
      </div>
    </div>
  );
};

export default Magnetometer; 