xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "https://api.cognitive.microsoft.com/bing/v5.0/Suggestions");
xmlhttp.setRequestHeader("Ocp-Apim-Subscription-Key", ab77602f5bd44f8392832be857240950);
xmlhttp.onload = function () {
  alert(xmlhttp.response);
};
xmlhttp.send();

