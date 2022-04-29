const pokemons = [
  {
    id:1,
    img: "https://www.serebii.net/pokemongo/pokemon/001.png"
  },
  {
    id:2,
    img: "https://www.serebii.net/pokemongo/pokemon/013.png"
  },
  {
    id:3,
    img: "https://www.serebii.net/pokemongo/pokemon/002.png"
  },
  {
    id:4,
    img: "https://www.serebii.net/pokemongo/pokemon/014.png"
  },
  {
    id:5,
    img: "https://www.serebii.net/pokemongo/pokemon/004.png"
  },
  {
    id:6,
    img: "https://www.serebii.net/pokemongo/pokemon/015.png"
  },
  {
    id:7,
    img: "https://www.serebii.net/pokemongo/pokemon/005.png"
  },
  {
    id:8,
    img: "https://www.serebii.net/pokemongo/pokemon/016.png"
  },
  {
    id:9,
    img: "https://www.serebii.net/pokemongo/pokemon/006.png"
  },
  {
    id:10,
    img: "https://www.serebii.net/pokemongo/pokemon/017.png"
  },
  {
    id:11,
    img: "https://www.serebii.net/pokemongo/pokemon/007.png"
  },
  {
    id:12,
    img: "https://www.serebii.net/pokemongo/pokemon/025.png"
  },
  {
    id:13,
    img: "https://www.serebii.net/pokemongo/pokemon/008.png"
  },
  {
    id:14,
    img: "https://www.serebii.net/pokemongo/pokemon/019.png"
  },
  {
    id:15,
    img: "https://www.serebii.net/pokemongo/pokemon/009.png"
  }
];

let arr = [];

for(let i = 0; i < 8; i++){
  for(let j = 0; j < 12; j++){
    arr.push({
      y: i,
      x: j,
      isBusy: false
    });
  }
}

let elHeroList = document.querySelector(".hero__list");

let x = 0;
let y = 0;

arr.forEach(_ => {
  if(x > 11){
    x = 0;
    y++;
  }
  let elItem = document.createElement("li");

  elItem.className = `hero__item y-${y} x-${x}`;

  elHeroList.appendChild(elItem);
  x++;
})

let elArr = [];

for (let i = 0; i < 4; i++) {
  pokemons.forEach((item) => {
    elArr.push(item);
  })
}

for (let i = 0; i < 100; i++) {
  let idx1 = Math.floor(Math.random() * 60);
  let idx2 = Math.floor(Math.random() * 60);

  let temp = elArr[idx1];
  elArr[idx1] = elArr[idx2];
  elArr[idx2] = temp;
}

let elItems = document.querySelectorAll(".hero__item");

let j = 0;
arr.forEach(item => {
  if(item.y != 0 && item.x != 0 && item.y != 7 && item.x != 11){
    item.isBusy = true;
    for(let i = 0; i < elItems.length; i++){
      if(elItems[i].classList.contains(`y-${item.y}`) && elItems[i].classList.contains(`x-${item.x}`)){
        elItems[i].classList.add(`${elArr[j].id}`)
        elItems[i].innerHTML = `
          <img src="${elArr[j].img}">
        `;
        break;
      }
    }
    j++;
    if(j == 100){
      j = 0;
    }
  } else{
    for(let i = 0; i < elItems.length; i++){
      if(elItems[i].classList.contains(`y-${item.y}`) && elItems[i].classList.contains(`x-${item.x}`)){
        elItems[i].style.opacity = "0";
        elItems[i].style.cursor = "default";
        break;
      }
    }
  }
});

let yArray = [];
let xArray = [];
let elIdArr = [];
let elLis = [];

elItems.forEach(item => {
  item.addEventListener("click", () => {
    elItems.forEach(color => {
      if(!(color.id.includes("through"))){
        color.style.background = "#f8f6d8";
      }
    });
    if(!(item.id.includes("through"))){
      item.style.background = "red";
    }
    if(yArray.length > 1 && xArray.length > 1 && elIdArr.length > 1 && elLis.length > 1){
      yArray.length = 0;
      xArray.length = 0;
      elIdArr.length = 0;
      elLis.length = 0;
    }
    let y = item.classList[1].slice(-1);
    let x = item.classList[2].slice(-1);
    let id = item.classList[3];
    arr.forEach(value => {
      if(value.y == y && value.x == x){
        yArray.push(y);
        xArray.push(x);
        elIdArr.push(id);
        elLis.push(item);
      }
    });
    if(yArray.length > 0 && xArray.length > 0){
      if(yArray[0] == yArray[1] || xArray[0] == xArray[1]){
        if(elIdArr[0] == elIdArr[1]){
          if(elLis[0].className != elLis[1].className){
            elLis.forEach(element => {
              element.innerHTML = "";
              element.id = "through";
              element.style.background = "#1c1f41";
            })
          }
        }
      }
    }
  });
});