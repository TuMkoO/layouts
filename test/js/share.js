'use strict';

function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function logText(message, isError) {
  if (isError)
    console.error(message);
  else
    console.log(message);
}

function logError(message) {
  logText(message, true);
}

async function testWebShare() {
  console.log('was press share');
  if (navigator.share === undefined) {
    logError('Error: Unsupported feature: navigator.share()');
    return;
  }

  const url = $(location).prop('href');

  try {
    await navigator.share({url});
    logText('Successfully sent share');
  } catch (error) {
    logError('Error sharing: ' + error);
  }
}

function onLoad() {
  document.querySelector('#share-btn').addEventListener('click', testWebShare);

  if (navigator.share === undefined) {
    if (window.location.protocol === 'http:') {
      // navigator.share() is only available in secure contexts.
      window.location.replace(window.location.href.replace(/^http:/, 'https:'));
    } else {
      logError('Error: You need to use a browser that supports this draft ' +
          'proposal.');
    }
  }
}

window.addEventListener('load', onLoad);