export function getImgSrcFromContent(content) {
  let tags = content.match(/<\/?[^>]+(>|$)/g);
  let result = "";
  if (tags?.length > 0) {
    result = tags
      .filter((el) => {
        return el?.length > 5;
      })[0]
      ?.match(/src=(\S+)/)[1]
      ?.replace(`"`, ``);
  }
  return result;
}

export function getLinkFromContent(content) {
  let tags = content?.match(/<\/?[^>]+(>|$)/g);
  let result = "";
  if (tags?.length > 0) {
    let assets = tags.filter((el) => {
      return el?.length > 5;
    });
    result = assets[assets?.length - 1]
      ?.match(/href=(\S+)/)[1]
      ?.replace(`"`, ``)
      ?.replace(`">`, "");
  }

  return result;
}

export function formatDate(date) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = daysOfWeek[date.getUTCDay()];
  const dayOfMonth = String(date.getUTCDate()).padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
    .toString()
    .padStart(2, "0");
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60)
    .toString()
    .padStart(2, "0");
  const timezoneSign = timezoneOffset > 0 ? "-" : "+";
  const timezone = `${timezoneSign}${timezoneOffsetHours}${timezoneOffsetMinutes}`;

  return `${day}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes}:${seconds} ${timezone}`;
}

export function generateRandomId() {
  const digits = "0123456789";
  let randomId = "";

  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    randomId += digits[randomIndex];
  }

  return randomId;
}
