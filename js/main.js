let listbox = document.querySelector('#listbox')

for (let i = 0; i < 4; i++) {
    pokemons.forEach((item) => {
        arrObj.push(item)
    })
}

//
// for(let i = 0; i < 4; i++) {
//   for(let l = 0; l < pokemons.length; l++) {

//   }
// }
//

for(let i = 1; i < 7; i++) {
  for(let m = 1; m < 11; m++) {
    arrXY.push({y: i, x: m})
  }
}

console.log(arrXY)

let arr_length = 60
for (let i = 0; i < 100; i++) {
    const idx1 = Math.floor(Math.random() * arr_length);
    const idx2 = Math.floor(Math.random() * arr_length);

    const temp = arrObj[idx1];
    arrObj[idx1] = arrObj[idx2];
    arrObj[idx2] = temp;
}


function addDisplay() {
  let x = 1
  let y = 1
  arrObj.forEach((item) => {
    if(x > 10) {
      x = 1
      y++
    }

    let li = document.createElement("li");
    li.className = `poke__item X-${x} Y-${y}`;
    li.innerHTML = `
      <button id="btn" class="poke__btn">
        <img class="poke__img" src="${item.img}" alt="img">
      </button>
    `;
    listbox.appendChild(li);
    x++
  });
}

addDisplay()



console.log(arrObj)