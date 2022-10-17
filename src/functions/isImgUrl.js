const { default: axios } = require("axios");
async function isImgUrl(url) {
    const resp = await axios.head(url).then((res) => res.headers["content-type"].startsWith("image"));
    return resp
  }

module.exports = isImgUrl;