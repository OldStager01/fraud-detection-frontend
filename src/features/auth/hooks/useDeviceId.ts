import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDeviceId = async () => {
      try {
        // Check localStorage first
        const storedId = localStorage.getItem("device_id");
        if (storedId) {
          setDeviceId(storedId);
          setIsLoading(false);
          return;
        }

        // Generate new fingerprint
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const id = result.visitorId;

        localStorage.setItem("device_id", id);
        setDeviceId(id);
      } catch (error) {
        // Fallback to random UUID if fingerprinting fails
        const fallbackId = crypto.randomUUID();
        localStorage.setItem("device_id", fallbackId);
        setDeviceId(fallbackId);
        console.warn("Fingerprint failed, using fallback:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDeviceId();
  }, []);

  return { deviceId, isLoading };
}
