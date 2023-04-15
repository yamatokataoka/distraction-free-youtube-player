// This function extracts the video ID from a YouTube URL
function extractVideoID(videoURL) {
  let videoID = '';
  if (videoURL.indexOf('youtu.be/') !== -1) { // If the URL is in the short format
    videoID = videoURL.split('youtu.be/')[1];
  } else if (videoURL.indexOf('v=') !== -1) { // If the URL is in the long format
    videoID = videoURL.split('v=')[1];
    const ampersandPosition = videoID.indexOf('&');
    if (ampersandPosition !== -1) {
      videoID = videoID.substring(0, ampersandPosition);
    }
  }
  return videoID;
}

// This function embeds the video with the given ID
function embedVideo() {
  const videoURL = document.getElementById('videoURL').value;
  const videoID = extractVideoID(videoURL);
  const videoEmbedURL = `https://www.youtube.com/embed/${videoID}`;
  const videoContainer = document.getElementById('videoContainer');
  videoContainer.innerHTML = `<iframe width="854" height="480" src="${videoEmbedURL}" frameborder="0" allowfullscreen></iframe>`;
  const params = new URLSearchParams(window.location.search);
  params.set('v', videoID);
  const newURL = `${location.pathname}?${params}`;
  window.history.pushState({}, '', newURL);
}

// This function loads the video with the given ID if it has been previously embedded
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const videoID = params.get('v');
  if (videoID) {
    const videoEmbedURL = `https://www.youtube.com/embed/${videoID}`;
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `<iframe width="854" height="480" src="${videoEmbedURL}" frameborder="0" allowfullscreen></iframe>`;
    document.getElementById('videoURL').value = `https://www.youtube.com/watch?v=${videoID}`;
  }

  const videoForm = document.getElementById('videoForm');
  videoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    embedVideo();
  });
};
