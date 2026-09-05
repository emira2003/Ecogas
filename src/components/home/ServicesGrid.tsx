import { services } from "@/data/services";
import { ServiceTile } from "@/components/services/ServiceTile";
import { TileDrift } from "./TileDrift";

/**
 * Seven photo-led service tiles; Boiler Replacement is double width (PLAN.md D3 §3).
 * Rendered on the server so none of the service copy reaches the browser; TileDrift adds
 * the touch-screen behaviour (F2-H3: the tile in view gets the slow photo drift).
 */
export function ServicesGrid() {
  return (
    <TileDrift className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {services.map((s) => {
        const wide = s.slug === "boiler-replacement-bolton";
        return (
          <ServiceTile
            key={s.slug}
            service={s}
            className={wide ? "tile--wide md:col-span-2" : ""}
            sizes={wide ? "(min-width: 1280px) 50vw, 100vw" : "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"}
          />
        );
      })}
    </TileDrift>
  );
}
