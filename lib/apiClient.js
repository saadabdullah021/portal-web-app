export async function getData(page, lang) {
  
  const res = await import(`../data/${page}.json`);
  return res.default[lang];
}
