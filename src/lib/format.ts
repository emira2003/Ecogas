/**
 * Money and number formatting. UK style: £1,999, no pence unless needed.
 */

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** 1999 → "£1,999" */
export const formatMoney = (amount: number): string => gbp.format(amount);

/** 1999 → "1,999" (no £), used when the £ sign is styled separately */
export const formatNumber = (amount: number, decimals = 0): string =>
  new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
