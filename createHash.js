function createHash(text){
    var hash = BigInt(0x811c9dc5);
    
      for (let i = 0; i < text.length; i++){
        hash ^= BigInt(text.charCodeAt(i));
        hash *= BigInt(0x1000193);
        hash &= BigInt(0xFFFFFFFF);  
      }
    while (hash.toString(16).length < 8){
      hash = "0"+hash.toString(16)
    }
    return hash.toString(16);
}

module.exports = createHash;