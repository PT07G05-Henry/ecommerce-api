function createHash(text) {
  var hash = BigInt(0x811c9dc5);

  for (let i = 0; i < text.length; i++) {
    hash ^= BigInt(text.charCodeAt(i));
    hash *= BigInt(0x1000193);
    hash &= BigInt(0xffffffff);
  }
  while (hash.toString(32).length < 8) {
    hash = "0" + hash.toString(32);
  }
  return hash.toString(32);
}

module.exports = createHash;
