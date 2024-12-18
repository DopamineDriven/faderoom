export const monthObj = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
} as const;

export function timeHelper([hour, minute]: [string, string]) {
  return /00/g.test(hour) === true
    ? `12:${minute} AM`
    : /(01|02|03|04|05|06|07|08|09|10|11)/g.test(hour) === true
      ? `${hour}:${minute} AM`
      : /12/g.test(hour) === true
        ? `12:${minute} PM`
        : (Number.parseInt(hour, 10) - 12).toString(10).concat(`:${minute} PM`);
}

export function dateTimeFormatHelper(props: string) {
  const splitIt = props.split(/ /g);

  const getTime = splitIt?.reverse()?.[0] ?? "";

  const [hour, minute] = getTime.split(/:/g) as [string, string];

  const handleTime = timeHelper([hour, minute]);

  const [year, month, day] = (props.split(/ /g)?.[0]?.split(/-/g) ?? [
    "",
    "",
    ""
  ]) as [string, string, string];

  const toMonth = monthObj[month as keyof typeof monthObj];


  return {
    full: `${toMonth} ${day}, ${year} at ${handleTime}`,
    ymd: `${toMonth} ${day}, ${year}`,
    iso8601DateOnly: `${year}-${month}-${day}`,
    hm: handleTime
  };
}

export function dateFormatter<const T extends number>(date: T) {
  /* to UTC-6 TZ, -6 hours */
  const d = date - 21600000;

  const written =
    new Date(d)
      .toISOString()
      .split(/\./)?.[0]
      ?.replace("T", " at ")
      ?.split(/:/g)
      ?.reverse()
      ?.slice(1)
      .reverse()
      .join(":") ?? "";
  return dateTimeFormatHelper(written);
}
