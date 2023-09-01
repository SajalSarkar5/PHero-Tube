const pHeroTube = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();

    const buttonContainer = document.getElementById('button-container')

    data.data.forEach((category) => {
        // console.log(category.data)
        const div = document.createElement('div')
        div.innerHTML = `
        <button onclick="displayShow('${category.category_id}')" class="btn capitalize font-inter text-[#636363]  text-base font-medium py-[10px] px-5">${category.category}</button>
        `
        buttonContainer.appendChild(div)
    })
}

const displayShow = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json()

    if (categoryId) {
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
        
        <div class="flex items-center justify-center w-full text-center mt-48">
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
            const div = document.createElement('div')
            div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow-xl">
                    <figure>
                    <div class="h-[200px] w-full">
                        <img class=" h-[200px] w-full" src="${card.thumbnail}" alt="">
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

