const img = document.querySelector('.welcome_img');

const height = img.clientHeight;
const width = img.clientWidth;

img.onmousemove = (e) => {
  const xVal = e.layerX;
  const yVal = e.layerY;

  const yRotation = 10 * ((xVal - width / 2) / width);
  const xRotation = -10 * ((yVal - height / 2) / height);

  const str = `perspective(500px) scale(1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

  img.style.transform = str;
};

img.onmouseout = () => {
  img.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
};
