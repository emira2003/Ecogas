"use client";

import { useState } from "react";
import { business } from "@/data/business";

const MAP_SRC = "https://www.google.com/maps?q=992a+Plodder+Lane+Bolton+BL5+1AQ&output=embed";

/** Google map of the address, loaded lazily; fades in once it has loaded (F2-C1). */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="map-embed">
      <iframe
        src={MAP_SRC}
        title={`Map showing ${business.name} at ${business.address.full}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className={loaded ? "is-loaded" : ""}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
