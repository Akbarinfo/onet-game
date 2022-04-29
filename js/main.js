let listbox = document.querySelector('#listbox')

//createlements
function createElements(...array){
  return array.map((item) => {
    return document.createElement(item)
  })
}

for(let i = 0; i < 4; i++) {
  for(let l = 0; l < pokemons.length; l++) {
    arrObj.push(pokemons[l])
  }
}


let time = 60
for (let i = 0; i < 41; i++) {
    let onecicle = Math.floor(Math.random() * time);
    let twocicle = Math.floor(Math.random() * time);

    let one = arrObj[onecicle];
    arrObj[onecicle] = arrObj[twocicle];
    arrObj[twocicle] = one;
}

let count = 0
let btn1 = null
let btn2 = null
let opacElem = null

function addDisplay() {
  let x = 1
  let y = 1
  arrObj.forEach((item) => {
    if(x > 10) {
      x = 1
      y++
    }

    let [li, btns, imgs] = createElements('li', 'button', 'img')
    li.className = `poke__item x-${x} y-${y}`;
    btns.className = 'poke__btn'
    btns.id = `${item.id}`
    imgs.className = 'poke__img'
    imgs.setAttribute('src', item.img)
    btns.appendChild(imgs)

    //quloq qoyib ketish qismi
    btns.addEventListener('click', (e) => {
      if(count == 0) {
        btn1 = e.path[2]
        ++count
      } else {
        btn2 = e.path[2]
        --count
        remove(btn1, btn2)
      }
    })

    li.appendChild(btns)
    listbox.appendChild(li);
    x++
  });
}

addDisplay()


function remove(btn1, btn2) {

  let allLi = [...document.querySelectorAll('li')]

  if(btn1.children[0].id == btn2.children[0].id) {
    let btn1Kor = btn1.className.split(' ')
    let btn2Kor = btn2.className.split(' ')
    let y1 = btn1Kor.at(-1).split('-').at(-1)
    let x1 = btn1Kor.at(-2).split('-').at(-1)
    let y2 = btn2Kor.at(-1).split('-').at(-1)
    let x2 = btn2Kor.at(-2).split('-').at(-1)

    if(+x1 < +x2) {
      opacElem = allLi.slice((+y1-1) * 10 + (+x1), (+y1-1) * 10 + +x2-1)
    } else if( +x1 > +x2) {
      opacElem = allLi.slice((+y1-1) * 10 + (+x2), (+y1-1) * 10 + +x1-1)
    }

    if((y1 ==  y2 && x1 == x2 - 1 ) || (x1 > x2 && x1 - 1 == x2 && y1 == y2)) {
      btn1.classList.add('poke__opac')
      btn2.classList.add('poke__opac')
    }
    else if((y1 > y2 && y1 - 1 == y2 && x1 == x2)|| (y1 ==  y2 - 1 && x1  == x2 )) {
      btn1.classList.add('poke__opac')
      btn2.classList.add('poke__opac')
    }
    if ((y1 == 1 && (x1 > x2 || x1 < x2)) || (y1 == 6 && (x1 < x2 || x1 > x2))) {
      btn1.classList.add('poke__opac')
      btn2.classList.add('poke__opac')
    }
    else if((x1 == 1 && (y1 > y2 || y1 < y2)) || (x1 == 10 &&( y1 < y2 || y1 > y2))) {
      btn1.classList.add('poke__opac')
      btn2.classList.add('poke__opac')
    }
     else {
      let opacCount = 0
      if(opacElem?.length) {
        for(let li of opacElem) {
          if(li.className.includes('poke__opac')) ++opacCount
        }
      }
      console.log(opacCount, opacElem?.length)
      if(opacCount == opacElem?.length && opacElem.length > 1) {
        btn1.classList.add('poke__opac')
        btn2.classList.add('poke__opac')
      }
    }
  }
   else {
    console.log('teng emas')
  }

  let liOpacCount = 0
  for(let li of allLi) {
    if(li.className.includes('poke__opac')) ++liOpacCount
  }

  if(liOpacCount == allLi.length) {
    alert('you win')
    listbox.innerHTML = null
    addDisplay()
  }
}