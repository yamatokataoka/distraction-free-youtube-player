function extractVideoID(videoURL) {
  var videoID = "";
  if (videoURL.indexOf("youtu.be/") != -1) { // If the URL is in the short format
    videoID = videoURL.split("youtu.be/")[1];
  } else if (videoURL.indexOf("v=") != -1) { // If the URL is in the long format
    videoID = videoURL.split("v=")[1];
    var ampersandPosition = videoID.indexOf("&");
    if (ampersandPosition != -1) {
      videoID = videoID.substring(0, ampersandPosition);
    }
  }
  return videoID;
}

function embedVideo() {
  var videoURL = document.getElementById("videoURL").value;
  var videoID = extractVideoID(videoURL);
  var videoEmbedURL = "https://www.youtube.com/embed/" + videoID;
  var videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = '<iframe width="854" height="480" src="' + videoEmbedURL + '" frameborder="0" allowfullscreen></iframe>';
  localStorage.setItem('videoID', videoID);
}

window.onload = function () {
  var videoID = localStorage.getItem('videoID');
  if (videoID) {
    var videoEmbedURL = "https://www.youtube.com/embed/" + videoID;
    var videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = '<iframe width="854" height="480" src="' + videoEmbedURL + '" frameborder="0" allowfullscreen></iframe>';
    document.getElementById("videoURL").value = 'https://www.youtube.com/watch?v=' + videoID;
  }
};