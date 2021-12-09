const videoPlayBtn = document.querySelector('.program_videoPlayBtn');
const iframePopup = document.querySelector('.program_iframePopup');
const iframeBox = document.querySelector('.program_iframeBox div');

videoPlayBtn.onclick = (e) => {
  e.preventDefault();
  iframePopup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.body.style.marginRight = '17px';
};

iframePopup.onclick = () => {
  const iframe = iframeBox.lastElementChild;

  iframe.src = iframe.src;
  iframePopup.style.display = '';
  document.body.style.overflow = '';
  document.body.style.marginRight = '';
};
