
'use strict'

// Fixed NavBar
const navbar = document.querySelector('.upper-nav');

window.onscroll = function () {
  if (scrollY >= 200) {
    navbar.classList.add('fixed_top');
  } else {
    navbar.classList.remove('fixed_top');
  }
}

// Toggle Menu

const menuToggle = document.querySelector('.toggle-menu');
const menu = document.querySelector('.upper-nav .links');


// Chekc If Show Or Collaspe

menuToggle.addEventListener('click', () => {
  menu.classList.contains('show')
  ? menu.classList.remove('show')
  : menu.classList.add('show');
});


// Scroll To Top

let scrollToTop = ()=> {

  const scrollPrograss = document.querySelector('.totop');

  // Go To Top

  scrollPrograss.addEventListener('click', function () {
    window.scroll({
      top:0,
      behavior: "smooth",
    })
  })

  // Show Button

  window.scrollY >= 450
  ? scrollPrograss.classList.add('show')
  : scrollPrograss.classList.remove('show');

  // Get Height
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let persentValue = (document.documentElement.scrollTop * 100) / height;

  console.log(persentValue)

  // Set Background
  scrollPrograss.style.background = `conic-gradient(var(--primaryColor) ${persentValue}%, #8750f750 ${persentValue}%)`

}

window.addEventListener('load', scrollToTop)
window.addEventListener('scroll', scrollToTop)


// Dark Mood

const themeToggle = document.querySelector('.dark-mood-toggle');

// Check If Local Storge

if (localStorage.getItem('theme') != undefined)  {

  document.querySelector('html').id = localStorage.getItem('theme');

} else {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) {
    document.querySelector('html').id = 'dark';
  } else {
    document.querySelector('html').id = 'light';
  }
}


themeToggle.addEventListener('click', () => {
  if (document.querySelector('html').id == 'dark') {

    // Change Mood
    document.querySelector('html').id = 'light';

    // Set In Local Stroge
    localStorage.setItem('theme' ,' light');

  } else {

    // Change Mood
    document.querySelector('html').id = 'dark';

    // Set In Local Stroge
    localStorage.setItem('theme' ,'dark');

  };
});

// Start Count

let state = document.querySelector('.state');
let stateNums = document.querySelectorAll('.state-num');

let start = false;

window.addEventListener('scroll', function () {
  if (scrollY >= state.offsetTop-400) {
    if (!start) {
      stateNums.forEach(startCount)
    }
    start = true
  }
})

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent === el.dataset.goal) {
      clearInterval(count)
    }
  }, 2000 / goal)
}

// Set Active Box Services Bg

const servs = document.querySelectorAll('.services .box');
const parentServs = servs[0].parentElement;
const activeBG = document.querySelector(".services .active-bg");

createActiveBg()

servs.forEach((box, i) => {

  box.addEventListener('mouseover', function () {
    const height = this.offsetHeight;
    activeBG.style.height = `${height}px`
    activeBG.style.top = `${height * i}px`
  });

  box.addEventListener('click', () => {
    servs.forEach(el => el.classList.remove('active'));
    this.classList.add('active');
  })

});

parentServs.addEventListener('mouseout', () => {
  createActiveBg()
});

function createActiveBg() {
  return servs.forEach((box, i) => {
    if (box.classList.contains('active')) {
      const height = box.offsetHeight;
      activeBG.style.height = `${height}px`
      activeBG.style.top = `${height * i}px`
    }
  });
}

// Set Number Items

let numItemsServ = document.querySelectorAll('.services .number-item');

numItemsServ.forEach((item, i) => {
  item.innerHTML = `0${i+1}`;
})

// Portifoli Filter

const shiffleitems = document.querySelectorAll('.shuffle-pannle .shuffle-item');
const Portifoliboxs = document.querySelectorAll('.portifolo-boxs .box-outer');

shiffleitems.forEach(item => {
  item.addEventListener('click', function () {

    // Set Active Buttoon
    shiffleitems.forEach(el => el.classList.remove('active'));
    this.classList.add('active');

    // Show Specific Items
    Portifoliboxs.forEach(box => {
      if (this.dataset.shuffle === box.dataset.items || this.dataset.shuffle == 'all') {
        box.classList.remove('hide');
      } else {
        box.classList.add('hide');
      }
    })

  })
})

// Static Year

const staticYear = document.querySelectorAll('.staticYear');

staticYear.forEach(el => {

  // Set Year
  el.innerHTML = (new Date).getFullYear();

});