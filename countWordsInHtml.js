function countWordsInHtml(html, numFrequentWords) {
  var hashTable = {}, words = [], wordObjects = [];

  function sortByFrequency(a, b) {
    return (b.frequency - a.frequency);
  }

  //Remove script tags and everything in between
  html = html.replace(/<script(.+?)>.+<\/script>/gi, "");
  //Remove html tags
  html = html.replace(/<(.+?)>/g, "");
  //Remove HTML character codes
  html = html.replace(/&[a-zA-Z0-9#]+;/g, "");
  //Leave only alphanumerics and whitespace intact -- this assumes a standard English typeset
  html = html.replace(/[^\w\s]+/g, "");
  //split based on whitespace
  var words = html.split(/\s+/);

  //Construct a hashtable so insertion doesn't cost much
  for(i=0;i<words.length;i++){
    if(!hashTable[words[i]]) {
      hashTable[words[i]] = 1;
    } else {
      hashTable[words[i]]++;
    }
  }
  //Make an array from our hashTable so we can use Array.sort()
  for(var property in hashTable){
    wordObjects.push({word: property, frequency: hashTable[property]});
  }
  wordObjects.sort(sortByFrequency);
  
  //Output the top N words used
  for(i=0;i<numFrequentWords;i++){
    if(wordObjects.length > i){
      console.log(wordObjects[i]);
    }
  }
}

var html = "<html><head><body><SCRIPT language=\"javascript\" title=\"WebHelpSplitCss\"><!--if (navigator.appName==\"Netscape\"){   document.write(\"<LINK rel=\'StyleSheet\' href=\'default_ns.css\'>\");}else{   document.write(\"<LINK rel='StyleSheet' href='default.css'>\");}//--></SCRIPT>blah. the quick brown fox is a jumping.  jumping quick! the fox is jumping because he is brown and jumping.</body></head></html>";


countWordsInHtml(html, 5);