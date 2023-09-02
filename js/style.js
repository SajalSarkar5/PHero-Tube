const pHeroTube = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();

    const buttonContainer = document.getElementById('button-container')

    let count = 0
    data.data.forEach((category) => {
        // console.log(category.data)
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="${count++}" onclick="displayShow(${category.category_id})" class="btn lg:px-5 lg:py-[10px]">${category.category}</button>
        `
        buttonContainer.appendChild(div)
    })
}

const SortData = () => {
    const div = document.getElementById('0').classList[3];
    const div2 = document.getElementById('1').classList[3];
    const div3 = document.getElementById('2').classList[3];
    const div4 = document.getElementById('3').classList[3];
    if (div === 'bg-[#FF1F3D]') {
        displayShow(1000, true)
    } else if (div2 === 'bg-[#FF1F3D]') {
        displayShow(1001, true)
    } else if (div3 === 'bg-[#FF1F3D]') {
        displayShow(1003, true)
    } else if (div4 === 'bg-[#FF1F3D]') {
        displayShow(1005, true)
    }
}


const displayShow = async (categoryId = 1000,isShort = false) => {
    if (categoryId === 1000) {
        document.getElementById('0').classList.add('bg-[#FF1F3D]', 'text-white')

        document.getElementById('1').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('2').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('3').classList.remove('bg-[#FF1F3D]', 'text-white')
    } else if (categoryId === 1001) {
        document.getElementById('1').classList.add('bg-[#FF1F3D]', 'text-white')

        document.getElementById('0').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('2').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('3').classList.remove('bg-[#FF1F3D]', 'text-white')
    } else if (categoryId === 1003) {
        document.getElementById('2').classList.add('bg-[#FF1F3D]', 'text-white')

        document.getElementById('1').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('0').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('3').classList.remove('bg-[#FF1F3D]', 'text-white')
    } else if (categoryId === 1005) {
        document.getElementById('3').classList.add('bg-[#FF1F3D]', 'text-white')

        document.getElementById('1').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('2').classList.remove('bg-[#FF1F3D]', 'text-white')
        document.getElementById('0').classList.remove('bg-[#FF1F3D]', 'text-white')
    }

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json()

    if (isShort) {
        data.data.sort((a, b) => {
            const dataA = parseInt(a.others.views)
            const dataB = parseInt(b.others.views)
            return dataB - dataA
        })
    }

    const cardContainer = document.getElementById('card-container')

    cardContainer.innerHTML = ''

    if (data.data.length === 0) {
        cardContainer.classList.remove('grid')
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="flex items-center justify-center w-full text-center mt-16 md:mt-28 lg:mt-48">
            <div>
                 <div class="flex justify-center items-center"><img src="https://i.postimg.cc/K85jSdYq/Icon.png" alt=""></div>
                 <h2 class="#171717 text-center text-3xl font-bold mt-8">Oops!! Sorry, There is no <br> content here</h2>
             </div>
        </div>  
        
        `
        cardContainer.appendChild(div)

    } else {
        cardContainer.classList.add('grid')
        cardContainer.innerHTML = ''
        for (const card of data.data) {
            const totalMinutes = Math.floor(card.others.posted_date / 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            const div = document.createElement('div')
            div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow-xl">
                    <figure>
                    <div class="h-[200px] w-full relative">
                        <img class=" h-[200px] w-full" src="${card.thumbnail}" alt="">

                        ${hours && minutes ? `<span class='absolute right-[7px] bottom-[7px] bg-[#171717] py-[5px] px-[10px] rounded-lg text-white '>${hours} hrs ${minutes} min ago</span>` : ''}

                    </div>
                    </figure>
                    <div class="card-body h-[150px]">
                      <div class="flex justify-start items-center gap-3">
                          <div class="w-[40px] rounded-full">
                              <img class="rounded-full" src= ${card.authors[0].profile_picture}/>
                          </div>
                         <div>
                            <h2 class="card-title">${card.title}</h2>
                         </div>
                      </div>

                      <div class="flex justify-start items-center gap-3">
                          <div >
                              <p class="text-[#595959] text-sm font-normal font-inter">${card.authors[0].profile_name}</p>
                          </div>
                         <div>
                         <h2 class="text-[#595959] text-sm font-normal font-inter">${card.authors[0].verified ? `<img class="h-[20px] w-5" src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=740" alt="" />` : ''} </h2>
                         </div>
                      </div>

                      <p>${card.others.views}</p>
                    </div>
                  </div>
            
            `

            cardContainer.appendChild(div)
        }
    }

}

function handleClickBlog() {
    window.location.href = 'http://127.0.0.1:5500/blog.html';
}

function handleHomeButton (){
    window.location.href = 'http://127.0.0.1:5500/index.html';
   
}

pHeroTube()

displayShow('1000')

