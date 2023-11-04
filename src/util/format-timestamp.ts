function pad(number: number) {
  return number < 10 ? '0' + number : number;
}

export default function formattedTimestamp() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `,"time":"${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}"`;
}