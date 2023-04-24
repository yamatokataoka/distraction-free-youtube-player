const EMBED_BASE_URL = "https://www.youtube.com/embed";
const WATCH_BASE_URL = "https://www.youtube.com/watch";

// This function extracts the video ID from a YouTube URL
function extractVideoID(videoURL) {
  return new URL(videoURL).searchParams.get('v') || videoURL.split('/').pop();
}

// This function creates the iframe element with the given URL
function createIframeElement(videoEmbedURL) {
  const iframe = document.createElement('iframe');
  iframe.width = '854';
  iframe.height = '480';
  iframe.src = videoEmbedURL;
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  return iframe;
}

// This function embeds the video with the given URL
function embedVideo(videoURL) {
  const videoEmbedURL = `${EMBED_BASE_URL}/${extractVideoID(videoURL)}`;
  const iframe = createIframeElement(videoEmbedURL);
  const videoContainer = document.getElementById('videoContainer');
  // Clears the contents of the videoContainer element.
  videoContainer.innerHTML = '';
  videoContainer.appendChild(iframe);
}

// This function loads the video with the given ID if it has been previously embedded
window.addEventListener('popstate', function() {
  const params = new URLSearchParams(window.location.search);
  const videoURL = params.get('v');
  if (videoURL) {
    embedVideo(videoURL)
    document.getElementById('videoURL').value = videoURL;
  }
});

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const videoURL = params.get('v');
  if (videoURL) {
    embedVideo(videoURL)
    document.getElementById('videoURL').value = videoURL;
  }
  const videoForm = document.getElementById('videoForm');
  videoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const videoURL = document.getElementById('videoURL').value;
    embedVideo(videoURL);
    const params = new URLSearchParams(window.location.search);
    params.set('v', videoURL);
    const newURL = `${location.pathname}?${params}`;
    window.history.pushState({}, '', newURL);
  });
};
