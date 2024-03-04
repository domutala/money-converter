export default function (value: string) {
  let result = "";
  const amount = value
    .replace(/\s/g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  if (amount) {
    const p = amount.split(".");
    const p1 = p[0].split("").reverse();
    const p2 = p[1];

    let step = 0;
    const r1: string[] = [];

    p1.forEach((p) => {
      step++;
      r1.push(p);
      if (step === 3) {
        step = 0;
        r1.push(" ");
      }
    });

    result = r1.reverse().join("").trim();

    if (amount.includes(".")) {
      result += ",";
      if (p2) result += ` ${p2.slice(0, 6)}`;
    }
  }

  return result;
}
