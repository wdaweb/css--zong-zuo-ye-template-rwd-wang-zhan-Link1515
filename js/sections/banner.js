const nextBtn = document.querySelector('.banner_nextBtn');
const prevBtn = document.querySelector('.banner_prevBtn');
const box = document.querySelector('.banner_box');
const main = document.querySelector('.banner_main');
let item = document.querySelectorAll('.banner_item');

let count = 1;
let transitionPic = '';

// 設置背景圖
for (let i = 0; i < item.length; i++) {
  item[i].style.background = `
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('./images/Banner_BestClass_Blog/${i}.jpg') no-repeat center / cover`;
}

// main 開頭插入末個 item
main.insertAdjacentHTML(
  'afterbegin',
  `
  <div class="banner_item banner_mainlast-cloned" style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url('./images/Banner_BestClass_Blog/${item.length - 1}.jpg') no-repeat center / cover">
        <div>
          <h1>${item[item.length - 1].querySelector('h1').innerHTML}</h1>
          <p>
            ${item[item.length - 1].querySelector('p').innerHTML}
          </p>
          <button class="primary-btn">
            <a href="#">Contact Now</a>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
`
);

// main 最後插入首個 item
main.insertAdjacentHTML(
  'beforeend',
  `
  <div class="banner_item banner_mainFirst-cloned" style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url('./images/Banner_BestClass_Blog/0.jpg') no-repeat center / cover">
        <div>
          <h1>${item[0].querySelector('h1').innerHTML}</h1>
          <p>
            ${item[0].querySelector('p').innerHTML}
          </p>
          <button class="primary-btn">
            <a href="#">Contact Now</a>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
`
);

// 插入過渡元素
for (let i = 0; i < item.length; i++) {
  box.insertAdjacentHTML(
    'beforeend',
    `
    <div class="banner_item banner_item-cloned" id="item-cloned-${i}" style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('./images/Banner_BestClass_Blog/${i}.jpg') no-repeat center / cover">
      <div>
        <h1>${item[i].querySelector('h1').innerHTML}</h1>
        <p>
          ${item[i].querySelector('p').innerHTML}
        </p>
        <button class="primary-btn">
          <a href="#">Contact Now</a>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  `
  );
}

// 重設 main 位置從 count 1 開始
main.style.left = `-${count * 100}vw`;

// 左右按鈕(淡入淡出)
nextBtn.onclick = () => {
  let current = count;

  fadeCountSetting('++');
  fadeInOut(current);
};

prevBtn.onclick = () => {
  let current = count;

  fadeCountSetting('--');
  fadeInOut(current);
};

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
  main.style.transition = '';
});

main.addEventListener('touchmove', (e) => {
  if (!isLoading) {
    touchNewPos = e.touches[0].pageX;
    main.style.left = `calc(-${count * 100}vw - ${touchStartPos - touchNewPos}px)`;
  }
});

main.addEventListener('touchend', () => {
  main.style.transition = 'left 0.3s';
  moveDetermine(touchStartPos, touchNewPos);

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
  main.style.transition = '';
  mouseStartPos = e.pageX;
  mouseNewPos = mouseStartPos;
  main.onmousemove = (e) => {
    if (!isLoading) {
      mouseNewPos = e.pageX;
      main.style.left = `calc(-${count * 100}vw - ${mouseStartPos - mouseNewPos}px)`;
    }
  };
};

main.onmouseup = () => {
  main.onmousemove = null;
  main.style.transition = 'left 0.3s';
  moveDetermine(mouseStartPos, mouseNewPos);
};

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
    count = 3;
  }
}

function fadeInOut(cur) {
  // 校正 cur
  cur--;

  // 關閉 transition
  main.style.transition = '';

  // 設置過渡圖片
  if (transitionPic) {
    transitionPic.classList.remove('banner_item-cloned-z5');
  }
  transitionPic = document.querySelector(`#item-cloned-${count - 1}`);
  transitionPic.classList.add('banner_item-cloned-z5');

  // 漸淡
  item[cur].style.opacity = '0';

  setTimeout(() => {
    item[cur].style.opacity = '1';
    main.style.left = `-${count * 100}vw`;
  }, 500);
}

function moveDetermine(startPos, NewPos) {
  if (startPos - NewPos > 100 && !isLoading) {
    count++;
    main.style.left = `-${count * 100}vw`;
    if (count === main.childElementCount - 1) {
      isLoading = true;
      setTimeout(() => {
        isLoading = false;
        main.style.transition = '';
        count = 1;
        main.style.left = `-${count * 100}vw`;
      }, 300);
    }
  } else if (startPos - NewPos < -100 && !isLoading) {
    count--;
    main.style.left = `-${count * 100}vw`;
    if (count === 0) {
      isLoading = true;
      setTimeout(() => {
        isLoading = false;
        main.style.transition = '';
        count = 3;
        main.style.left = `-${count * 100}vw`;
      }, 300);
    }
  } else if (startPos - NewPos < 100 && startPos - NewPos > -100) {
    main.style.left = `-${count * 100}vw`;
  }
}

function autoPlay() {
  timer = setInterval(() => {
    let current = count;

    fadeCountSetting('++');
    fadeInOut(current);
  }, 5000);
}
