/**
 *
 * @param str title
 * @return html string
 */

export const colorLetter = (str: string): string => {
  const random = Math.floor(Math.random() * str.length);
  const arr = str.split("");
  let letter = arr[random];
  arr[random] = `<span>${letter}</span>`;
  return `<h1>${arr.join("")}</h1>`;
};
