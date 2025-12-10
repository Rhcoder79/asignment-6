console.log('i am connected');
//document.getElementById('all-category')
const loadCategory=()=>{
  const url='https://openapi.programming-hero.com/api/categories';
  fetch(url)
  .then(response=>response.json())
  .then(jsonResult=>displayCategory(jsonResult));
  
}

const displayCategory=(categoryName)=>{
    const categories=categoryName.categories
    const allCategory=document.getElementById("all-category");
    allCategory.innerHTML='';
    for(const name of categories){
        const categoryList=document.createElement('li');
        categoryList.innerHTML= `
        
        ${name.category_name}
        `
        allCategory.append(categoryList);
    }
}
loadCategory();
const loadCard=()=>{
    const url='https://openapi.programming-hero.com/api/plants';
    fetch(url)
    .then(res=>res.json())
    .then(result=>allCards(result));
}
const allCards=(cardInfo)=>{
  const plants=cardInfo.plants;
  const cardContainer=document.getElementById("card-container");
  cardContainer.innerHTML='';
  for(const card of plants){
    const cardDiv=document.createElement('div');
    cardDiv.innerHTML=`
        <div class="cards">
        <div><img src="${card.image}" alt="image not fount"></div>
     <div >
    <h3 >${card.name}</h3>
    <p>${card.description }</p>
    <div>
        <label for="">${card.category}</label>
        <h3>${card.price}</h3>
    </div>
           <button   class="btn bg-[#15803D] text-white  mt-5 w-full rounded-3xl" >Add To Card</button>

</div>
     </div>
    `
    cardContainer.append(cardDiv);
  }
}
loadCard();

