function cleanup() {
  //This array houses the search queries you need to execute to find all the messages you want
  //cleaned from your email.
  const queryArray = [ "in:anywhere from:(shop@teavana.com OR info.postcustomercentre@yahoo.com OR shop@poshmark.com OR catholicuniversity@catholicua.org OR catholicuniversity@catholicua.org OR accra.unic.gh@presidency.com OR nytdirect@nytimes.com OR notifications@github.com OR newsletter@p.indiegogo.com OR notification@service.tiktok.com OR news@emails.waves-audio.com OR dan@tldrnewsletter.com OR microcenter@microcenterinsider.com OR noreply@steampowered.com OR extracare@pharmacy.cvs.com) after:2015/1/1 before:2024/1/26 older_than:" ];
  
  //This array houses objects with an index, a type, and a value.
  //The index field is directly mapped to the queryArray to describe what query the value belongs to.
  //The type field describes what the value is to mean. Examples are year, month, day.
  //The value field is the value to use when creating the final query object.
  const delayInfo = [{index: 0, type: "year", value: 1}];
  
  //The limit is the maximum number of operations that can be performed by GmailApp API in a single call.
  const BATCH_LIMIT = 100;
  
  for (var i = 0; i < queryArray.length; i++) {
    var delayOK = false;
    var queryValue = queryArray[i];
    for (var j = 0; j < delayInfo.length; j++) {
      if (delayInfo[j].index == i) {
        queryValue += delayInfo[j].value;
        switch(delayInfo[j].type) {
          case "year":
          case "month":
          case "day":
            queryValue += delayInfo[j].type.charAt(0);
            delayOK = true;
            break;
          default:
            delayOK = false;
        }
      }
    }
    if (delayOK) {
      messageCleanup(queryValue, BATCH_LIMIT);
    }
  }
}

function messageCleanup(query, BATCH_LIMIT) {
  var processedThreadCount = 0;
  var threads = GmailApp.search(query, 0, BATCH_LIMIT);
  while (threads.length > 0) {
    GmailApp.moveThreadsToTrash(threads);
    threads = GmailApp.search(query, 0, BATCH_LIMIT);
  }
}
