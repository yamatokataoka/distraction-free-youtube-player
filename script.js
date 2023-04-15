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

// This function creates the iframe element with the given URL
function createIframeElement(videoEmbedURL) {
  const iframe = document.createElement('iframe');
  iframe.width = '854';
  iframe.height = '480';
  iframe.src = videoEmbedURL;
  iframe.frameborder = '0';
  iframe.allowfullscreen = true;
  return iframe;
}

// This function embeds the video with the given ID
function embedVideo() {
  const videoURL = document.getElementById('videoURL').value;
  const videoID = extractVideoID(videoURL);
  const videoEmbedURL = `https://www.youtube.com/embed/${videoID}`;
  const iframe = createIframeElement(videoEmbedURL);
  const videoContainer = document.getElementById('videoContainer');
  //  Clears the contents of the videoContainer element.
  videoContainer.innerHTML = '';
  videoContainer.appendChild(iframe);
  const params = new URLSearchParams(window.location.search);
  params.set('v', videoID);
  const newURL = `${location.pathname}?${params}`;
  window.history.pushState({}, '', newURL);
}

// This function loads the video with the given ID if it has been previously embedded
window.addEventListener('popstate', function() {
  const params = new URLSearchParams(window.location.search);
  const videoID = params.get('v');
  if (videoID) {
    const videoEmbedURL = `https://www.youtube.com/embed/${videoID}`;
    const iframe = createIframeElement(videoEmbedURL);
    const videoContainer = document.getElementById('videoContainer');
    //  Clears the contents of the videoContainer element.
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
    document.getElementById('videoURL').value = `https://www.youtube.com/watch?v=${videoID}`;
  }
});

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const videoID = params.get('v');
  if (videoID) {
    const videoEmbedURL = `https://www.youtube.com/embed/${videoID}`;
    const iframe = createIframeElement(videoEmbedURL);
    const videoContainer = document.getElementById('videoContainer');
    //  Clears the contents of the videoContainer element.
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
    document.getElementById('videoURL').value = `https://www.youtube.com/watch?v=${videoID}`;
  }

  const videoForm = document.getElementById('videoForm');
  videoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    embedVideo();
  });
};