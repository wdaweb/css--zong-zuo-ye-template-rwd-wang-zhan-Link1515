const headers = document.querySelectorAll('.accordion_header');

for (let i = 0; i < headers.length; i++) {
  const content = headers[i].parentElement.nextElementSibling;
  const contentHeight = getComputedStyle(content).height;
  const arrow = headers[i].lastElementChild.firstElementChild;

  content.style.height = '0px';
  headers[i].onclick = () => {
    if (content.style.height === '0px') {
      content.style.height = contentHeight;
      arrow.classList.replace('fa-angle-down', 'fa-angle-up');
    } else {
      content.style.height = '0px';
      arrow.classList.replace('fa-angle-up', 'fa-angle-down');
    }
  };
}
