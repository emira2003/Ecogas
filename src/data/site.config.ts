/**
 * Site-wide switches.
 *
 * Change `true` to `false` (or back) to turn a feature on or off.
 * Nothing else needs editing — the components read these values.
 */
export const siteConfig = {
  /** The small alien plumber illustration on the 404 page. Client to approve before launch. */
  alien404: true,

  /** Clicking the hero pilot flame 7 times sends the alien across the screen in a boiler-shaped UFO. Off until Xhezmi decides. */
  easterEgg: false,

  /** The "Ignition" hero intro on the home page. Plays once per visit session. */
  heroIntro: true,

  /**
   * Smooth scrolling (Lenis) on desktop / mouse devices only. Never used on touch screens.
   *
   * OFF by default. Smooth scrolling takes the mouse wheel away from the browser and animates
   * the page itself, so if anything goes wrong with it the page stops scrolling completely —
   * which is exactly what happened during the build. With it off, the browser does the
   * scrolling and that can never fail.
   *
   * The known bug behind that failure is fixed. Set this to `true` to try it again, then check
   * the wheel, a trackpad, the mobile menu and the photo lightbox before keeping it on.
   */
  smoothScroll: false,

  /** The scrolling reviews marquee on the home page. `false` shows a static grid instead. */
  marquee: true,
} as const;

export type SiteConfig = typeof siteConfig;
