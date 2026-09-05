import type { NextConfig } from "next";
import os from "os";

function getLocalDevOrigins(): string[] {
  const origins: string[] = [
    "localhost",
    "127.0.0.1",
    "*.local",
    "192.168.*",
    "10.*",
    "172.*",
    "100.*"
  ];
  
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === "IPv4" && !iface.internal) {
          origins.push(iface.address);
        }
      }
    }
  } catch (e) {
    // Fallback if network interfaces lookup fails
  }
  
  return origins;
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getLocalDevOrigins(),
};

export default nextConfig;

