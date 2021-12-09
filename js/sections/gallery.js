const body = document.querySelector('.gallery_body');
const moveBoxes = document.querySelectorAll('.gallery_itemMoveBox');
const btns = document.querySelectorAll('.gallery_filterBtns button');
const allBtn = document.querySelector('#filterBtn_allBtn');
const eventBtn = document.querySelector('#filterBtn_eventBtn');
const classBtn = document.querySelector('#filterBtn_classBtn');
const activitiesBtn = document.querySelector('#filterBtn_activitiesBtn');
const teachingBtn = document.querySelector('#filterBtn_teachingBtn');

// btn click event

allBtn.onclick = () => {
  removeBtnActiveClass();
  allBtn.classList.add('filterBtn-active');

  for (let i = 0; i < moveBoxes.length; i++) {
    moveBoxes[i].classList.remove('gallery_itemMoveBox-hidden');
  }

  arrangeBox();
};

eventBtn.onclick = () => {
  removeBtnActiveClass();
  eventBtn.classList.add('filterBtn-active');

  const reg = /event/;

  testItemType(reg);
  arrangeBox();
};

classBtn.onclick = () => {
  removeBtnActiveClass();
  classBtn.classList.add('filterBtn-active');

  const reg = /class/;

  testItemType(reg);
  arrangeBox();
};

activitiesBtn.onclick = () => {
  removeBtnActiveClass();
  activitiesBtn.classList.add('filterBtn-active');

  const reg = /activities/;

  testItemType(reg);
  arrangeBox();
};

teachingBtn.onclick = () => {
  removeBtnActiveClass();
  teachingBtn.classList.add('filterBtn-active');

  const reg = /teaching/;

  testItemType(reg);
  arrangeBox();
};

// first load and resize
window.addEventListener('load', () => {
  arrangeBox();
});

window.addEventListener('resize', () => {
  arrangeBox();
});

// ******** function ********

function arrangeBox() {
  // getComputedStyle 取值時會受到transition干擾，要先關掉
  for (let i = 0; i < moveBoxes.length; i++) {
    moveBoxes[i].style.transition = '';
  }
  const moveBoxesNow = document.querySelectorAll('.gallery_body > div:not(.gallery_itemMoveBox-hidden)');
  const moveBoxHeight = parseInt(getComputedStyle(moveBoxesNow[0]).height);
  for (let i = 0; i < moveBoxes.length; i++) {
    moveBoxes[i].style.transition = 'all 0.5s';
  }

  let floor = 0;

  if (window.innerWidth >= 992) {
    for (let i = 0; i < moveBoxesNow.length; i++) {
      moveBoxesNow[i].style.top = floor * moveBoxHeight + 'px';

      if (i % 3 === 0) {
        moveBoxesNow[i].style.left = '0';
      } else if (i % 3 === 1) {
        moveBoxesNow[i].style.left = '33.333%';
      } else {
        moveBoxesNow[i].style.left = '66.666%';
        floor++;
      }
    }

    // 為了後續高度計算，修正item不為3的倍數時的狀況
    if (moveBoxesNow.length % 3 === 1 || moveBoxesNow.length % 3 === 2) {
      floor++;
    }

    body.style.height = moveBoxHeight * floor + 'px';
  } else if (window.innerWidth >= 768) {
    for (let i = 0; i < moveBoxesNow.length; i++) {
      moveBoxesNow[i].style.top = floor * moveBoxHeight + 'px';

      if (i % 2 === 0) {
        moveBoxesNow[i].style.left = '0';
      } else {
        moveBoxesNow[i].style.left = '50%';
        floor++;
      }
    }

    // 為了後續高度計算，修正item為奇數時的狀況
    if (moveBoxesNow.length % 2 === 1) {
      floor++;
    }

    body.style.height = moveBoxHeight * floor + 'px';
  } else {
    for (let i = 0; i < moveBoxesNow.length; i++) {
      moveBoxesNow[i].style.left = '0';
      moveBoxesNow[i].style.top = `${i * moveBoxHeight}px`;
    }

    body.style.height = moveBoxHeight * moveBoxesNow.length + 'px';
  }
}

function removeBtnActiveClass() {
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('filterBtn-active');
  }
}

function testItemType(reg) {
  for (let i = 0; i < moveBoxes.length; i++) {
    if (reg.test(moveBoxes[i].dataset.type)) {
      moveBoxes[i].classList.remove('gallery_itemMoveBox-hidden');
    } else {
      moveBoxes[i].classList.add('gallery_itemMoveBox-hidden');
    }
  }
}
