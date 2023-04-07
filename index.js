const cheerio = require("cheerio");

function walk(dom) {
  let out = "";
  if (dom) {
    dom.forEach((el) => {
      if (el.type === "text") {
        out += el.data;
      }
      if (el.type === "tag") {
        switch (el.name) {
          case "a":
            out += `<${el.attribs.href}|${walk(el.children)}>`;
            break;
          case "strong":
          case "b":
            out += `*${walk(el.children)}*`;
            break;
          case "i":
          case "em":
            out += `_${walk(el.children)}_`;
            break;
          default:
            out += walk(el.children);
        }
      }
    });
  }
  return out;
}

module.exports = function slackify(html) {
  const $ = cheerio.load(html);
  const dom = $("body").get();
  const result = walk(dom);

  return result;
};
