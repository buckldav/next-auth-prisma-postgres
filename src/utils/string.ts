import { Decimal } from "@prisma/client/runtime";

export function calcWidthOfField(field: string) {
  // http://nosetothepage.org/fontFamStatsChrome.html
  const AVG_CHAR_WIDTH_ROBOTO = 8.27; // per 1rem
  const MAX_WIDTH = 200;
  const BUFFER = 36 - 0.8 * field.length;
  const WIDTH =
    field.length * AVG_CHAR_WIDTH_ROBOTO + (BUFFER < 0 ? 0 : BUFFER);
  return WIDTH > MAX_WIDTH ? MAX_WIDTH : WIDTH;
}

export function formatMoney(money: Decimal) {
  return `$${Number(money as unknown as number).toFixed(2)}`;
}

export function formatDateString(date: string) {
  return new Date(Date.parse(date)).toDateString();
}

export function reformatDate(fullDate: string | number | Date) {
  const date = new Date(fullDate);

  return date.toDateString().slice(4);
}
