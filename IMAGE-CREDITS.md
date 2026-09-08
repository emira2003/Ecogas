# Image credits

Every photo in `/public/images` that is not the client's own is listed here with where it came
from. Photos are downloaded into the project, never hot-linked from another website.

## Stock photos in use

All are from Pexels, whose licence allows commercial use without payment or attribution. They
are credited here anyway, because it is good practice and it records where each one came from.

| File | What it shows | Used for | Photographer |
|---|---|---|---|
| `images/photos/hero-boiler-service.jpg` | Gloved hands working inside an open combi boiler | Home page hero | Heiko Ruth |
| `images/photos/boiler-kitchen.jpg` | A new white combi boiler on a kitchen wall | Boiler replacement | Max Vakhtbovych |
| `images/photos/radiator-valve-fitting.jpg` | An engineer fitting the valve to a new radiator | Central heating | Sergei Starostin |
| `images/photos/boiler-install.jpg` | An engineer working inside an open wall-mounted boiler | Servicing & repairs | МОБО Модульные Котельные |
| `images/services/gas-hob-flames.jpg` | Blue flames on a gas hob, close up | Landlord gas safety certificates | Mateusz Feliksik |
| `images/photos/copper-pipework.jpg` | Hands tightening a brass fitting on copper pipe | Not currently used | Anıl Karakaya |
| `images/services/bathroom-contemporary.jpg` | Contemporary bathroom, twin basins on a wooden vanity | Not currently used | Max Vakhtbovych |
| `images/photos/pipe-wrench.jpg` | A steel pipe wrench on a pale wooden surface | Not currently used | Kindel Media |
| `images/photos/warm-room-radiator.jpg` | Sunlight across a wooden table beside a radiator | Closing call-to-action band | Kate Filatova |

Source pages, in the same order:

- pexels.com/photo/plumber-repairing-power-source-7859953/
- pexels.com/photo/white-counter-top-on-gray-kitchen-cabinets-8146317/
- pexels.com/photo/professional-plumber-installing-a-radiator-pipe-29226620/
- pexels.com/photo/technician-repairing-heating-system-in-workshop-34938439/
- pexels.com/photo/close-up-shot-of-a-stove-13422435/
- pexels.com/photo/plumber-installs-pipe-fittings-6419128/
- pexels.com/photo/contemporary-bathroom-with-minimalistic-interior-7045908/
- pexels.com/photo/close-up-photo-of-plumbers-wrench-on-wooden-surface-8488058/
- pexels.com/photo/sunlit-wooden-dining-table-with-radiator-30680046/

### A note on the earlier search

An earlier pass through Pexels and Unsplash reviewed 24 candidates and found only two usable
images, and this file previously recorded that free libraries have almost nothing for UK
domestic gas work. That conclusion was wrong, and it was wrong because the search terms were
too literal: only "boiler" and "combi boiler" were tried, and those return antique museum
boilers, rooftop solar heaters and oil refineries.

Searching for what the work actually looks like, with terms such as "radiator heating",
"plumber", "heating engineer" and "boiler installation", returned plenty. The nine images above came from about
thirty candidates on the second pass.

The photo used in the closing call-to-action band is a warm domestic interior. It is
atmosphere for the line "Ready for a warmer, safer home?", not a claim about a particular job,
which is why a library image is honest in that slot.

## Illustrations (drawn by us, no licence needed)

Where a photo would have to be Eco Gas's own, the site still uses a drawn panel: a dark Cast
Iron ground with a faint blueprint grid, a soft warm glow and the subject drawn in Flame
orange. They are designed to look deliberate rather than like a missing image, and they are
tiny (around 1 KB each).

| File | Subject | Used for |
|---|---|---|
| `team.svg` | Van | "Why people in Bolton choose us" |
| `engineer.svg`, `workshop.svg` | Wrench, pipework | About page photo slots |
| `work-01.svg` … `work-12.svg` | Mixed | Recent jobs and Our Work |
| `pair-1-*.svg`, `pair-2-*.svg` | Before and after | Before/after sliders |

The "before" halves of the before/after pairs are drawn in grey rather than orange, so the
slider still reads as old-versus-new.

**Deliberately not stock photos:** the Our Work gallery, the before/after sliders, the "Why
people in Bolton choose us" photo and the About page photos all claim to show Eco Gas's own
work, team and premises. Filling them with stock photos of other people's boilers would
misrepresent the business, so they stay as illustrations until the client sends real photos.

`hero-boiler.svg` and the five `service-*.svg` panels are no longer referenced by any page,
because those slots now hold photographs. They are kept in the repository as a fallback.

## Map data — attribution required

The coverage map (`src/data/nw-map.ts`) is a real map. Its 41 local authority outlines come
from Ordnance Survey / Office for National Statistics boundary data (Local Authority Districts,
December 2013), taken from github.com/martinjc/UK-GeoJSON and projected into the map's viewBox.

That data is published under the **Open Government Licence v3**, which allows commercial use
but **does require the attribution below to appear**. It is on the page, in small print under
the map — do not remove it:

> Contains National Statistics data © Crown copyright and database right 2013.
> Contains OS data © Crown copyright and database right 2013.

No map tiles, no map library and no third-party requests are involved, so the map sets no
cookies and works offline. To regenerate it, see the note at the top of `src/data/nw-map.ts`.

## Client's own photos

Listed here once received, so it is clear which images belong to Eco Gas.

| File | What it shows | Received on |
|---|---|---|
| _none yet_ | | |

## Added with the boiler specific rebuild

| File | What it shows | Used for | Photographer |
|---|---|---|---|
| `images/photos/underfloor-warm-feet.jpg` | Bare feet on a warm wooden floor | Underfloor heating | cottonbro studio |
| `images/photos/smart-thermostat.jpg` | A hand adjusting a wall-mounted smart thermostat | Heating controls | HUUM |

- pexels.com/photo/person-standing-on-the-wooden-floor-with-barefoot-5904034/
- pexels.com/photo/modern-smart-thermostat-with-user-interface-36818203/

`images/services/bathroom-contemporary.jpg` and `images/photos/pipe-wrench.jpg` are no longer
referenced by any page, because bathrooms and general plumbing came off the site. They are kept
in the repository in case either service comes back.

## Brand logos, not yet supplied

The moving strip on the home page shows Vaillant, Worcester Bosch, Viessmann, Hive and Honeywell
as plain wordmarks. Real logos need the official files from each maker's installer portal, not
images lifted from a web search, which come out low resolution and often the wrong version. Put
them in `/public/images/brands/` and fill in `logo:` in `src/data/business.ts`.

**An accredited installer badge is a credential, not a logo.** Only show the schemes the business
actually holds. `accreditation:` in `business.ts` is null for every make until we are told
otherwise, so nothing is currently claimed.
