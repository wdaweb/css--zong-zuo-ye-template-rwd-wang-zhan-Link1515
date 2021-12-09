// carousel type 1
const box = document.querySelector('.carouselType1_box');
const main = document.querySelector('.carouselType1_main');
let item = document.querySelectorAll('.carouselType1_main .carouselType1_item');
let itemWidth = parseInt(getComputedStyle(item[0]).width);
const btns = document.querySelector('.carouselType1_switch');

// 參數
const opacityDuration = 500;
const movingDuration = 300;
const autoPlayInterval = 5000;

let count = 1;
let transitionPic = '';

// main 開頭插入末個 item
main.insertAdjacentHTML(
  'afterbegin',
  `
  <div class="carouselType1_item">
    <img draggable="false" src="${item[item.length - 1].firstElementChild.src}" />
  </div>
`
);

// main 最後插入首個 item
main.insertAdjacentHTML(
  'beforeend',
  `
  <div class="carouselType1_item">
    <img draggable="false" src="${item[0].firstElementChild.src}" />
  </div>
`
);

// 插入過渡元素
for (let i = 0; i < item.length; i++) {
  box.insertAdjacentHTML(
    'beforeend',
    `
    <div class="carouselType1_item carouselType1_item-clone" id="carouselType1_item-cloned-${i}">
    <img draggable="false" src="${item[i].firstElementChild.src}" />
  </div>
  `
  );
}

// switch 插入 span
for (let i = 0; i < item.length; i++) {
  btns.insertAdjacentHTML('afterbegin', '<span></span>');
}

for (let i = 0; i < btns.children.length; i++) {
  btns.children[i].onclick = () => {
    let current = count;

    count = i + 1;
    fadeInOut(current);
    changeSwitch();

    // 關閉自動撥放
    clearInterval(timer);

    setTimeout(() => {
      autoPlay();
    }, opacityDuration);
  };
}

// btns 首個 child 加入 class
btns.children[0].classList.add('switch-active');

// 重取 item
item = document.querySelectorAll('.carouselType1_main .carouselType1_item');
// 重設 item[0] 位置從 count 1 開始
item[0].style.marginLeft = `-${count * itemWidth}px`;

// 自動輪播(淡入淡出)
let timer = 0;
autoPlay();

// 觸控滑動
let touchStartPos = 0;
let touchNewPos = 0;
let isLoading = false;

main.addEventListener('touchstart', (e) => {
  // 停止自動撥放
  clearInterval(timer);

  touchStartPos = e.touches[0].pageX;
  touchNewPos = touchStartPos;
  item[0].style.transition = '';
});

main.addEventListener('touchmove', (e) => {
  if (!isLoading) {
    touchNewPos = e.touches[0].pageX;
    item[0].style.marginLeft = `calc(-${count * itemWidth}px - ${touchStartPos - touchNewPos}px)`;
  }
});

main.addEventListener('touchend', () => {
  item[0].style.transition = 'margin 0.3s';
  moveDetermine(touchStartPos, touchNewPos);

  // 更換 switch
  changeSwitch();

  // 開啟自動撥放
  autoPlay();
});

// 滑鼠點擊滑動
let mouseStartPos = 0;
let mouseNewPos = 0;

main.onmouseover = () => {
  // 停止自動撥放
  clearInterval(timer);
};

main.onmouseout = () => {
  autoPlay();
};

main.onmousedown = (e) => {
  item[0].style.transition = '';
  mouseStartPos = e.pageX;
  mouseNewPos = mouseStartPos;
  main.onmousemove = (e) => {
    if (!isLoading) {
      mouseNewPos = e.pageX;
      item[0].style.marginLeft = `calc(-${count * itemWidth}px - ${mouseStartPos - mouseNewPos}px)`;
    }
  };
};

document.onmouseup = () => {
  main.onmousemove = null;
  item[0].style.transition = 'margin 0.3s';
  moveDetermine(mouseStartPos, mouseNewPos);

  mouseStartPos = 0;
  mouseNewPos = 0;

  // 更換 switch
  changeSwitch();
};

// resize更新輪播圖寬度
window.addEventListener('resize', () => {
  itemWidth = parseInt(getComputedStyle(item[0]).width);
  item[0].style.marginLeft = `-${count * itemWidth}px`;
});

// ************ function **************
function fadeCountSetting(str) {
  if (str === '++') {
    count++;
  } else if (str === '--') {
    count--;
  }

  // 設定 count 不會到最前與最後
  if (count === main.childElementCount - 1) {
    count = 1;
  } else if (count === 0) {
    conut = main.childElementCount - 2;
  }
}

function fadeInOut(cur) {
  // 關閉 transition
  item[0].style.transition = '';

  // 設置過渡圖片
  if (transitionPic) {
    transitionPic.classList.remove('carouselType1_item-clone-z1');
  }
  transitionPic = document.querySelector(`#carouselType1_item-cloned-${count - 1}`);
  transitionPic.classList.add('carouselType1_item-clone-z1');

  // 漸淡
  item[cur].style.opacity = '0';

  // 更換 switch
  changeSwitch();

  setTimeout(() => {
    item[cur].style.opacity = '1';
    item[0].style.marginLeft = `-${count * itemWidth}px`;
  }, opacityDuration);
}

function moveDetermine(startPos, NewPos) {
  if (startPos - NewPos > 100 && !isLoading) {
    count++;
    item[0].style.marginLeft = `-${count * itemWidth}px`;
    if (count === main.childElementCount - 1) {
      isLoading = true;
      setTimeout(() => {
        isLoading = false;
        item[0].style.transition = '';
        count = 1;
        item[0].style.marginLeft = `-${count * itemWidth}px`;
      }, movingDuration);
    }
  } else if (startPos - NewPos < -100 && !isLoading) {
    count--;
    item[0].style.marginLeft = `-${count * itemWidth}px`;
    if (count === 0) {
      isLoading = true;
      setTimeout(() => {
        isLoading = false;
        item[0].style.transition = '';
        count = 3;
        item[0].style.marginLeft = `-${count * itemWidth}px`;
      }, movingDuration);
    }
  } else if (startPos - NewPos < 100 && startPos - NewPos > -100) {
    item[0].style.marginLeft = `-${count * itemWidth}px`;
  }
}

function autoPlay() {
  timer = setInterval(() => {
    let current = count;

    fadeCountSetting('++');
    fadeInOut(current);
  }, autoPlayInterval);
}

function changeSwitch() {
  let num = 0;

  // 設定 count 不會到最前與最後
  if (count === main.childElementCount - 1) {
    num = 0;
  } else if (count === 0) {
    num = main.childElementCount - 3;
  } else {
    num = count - 1;
  }

  for (let i = 0; i < btns.children.length; i++) {
    btns.children[i].classList.remove('switch-active');
  }
  btns.children[num].classList.add('switch-active');
}
