 console.log('i am connected');
const loadCategory=()=>{
  const url='https://openapi.programming-hero.com/api/categories';
  fetch(url)
  .then(response=>response.json())
  .then(jsonResult=>displayCategory(jsonResult.categories));
  
}

 const matched=(id)=>{
 console.log(id);
 }

 const displayCategory=(categoryName)=>{
  
//     const categories=categoryName.categories
     const allCategory=document.getElementById("all-category");
    allCategory.innerHTML='';
    for(let name of categoryName){
     console.log(name);
         const categoryList=document.createElement('li');
         
       categoryList.innerHTML= `
              <a onclick="matched('${name.category_name}')" href="#">${name.category_name}</a>
              `;
         allCategory.append(categoryList);
        
    }
 } 
 loadCategory();
// const displayCategory=(categoryName)=>{
//     const categories=categoryName.categories
//     const allCategory=document.getElementById("all-category");
//     allCategory.innerHTML='';
//     for(const name of categoryName){
//         const categoryList=document.createElement('li');
//         categoryList.innerHTML = `
//         <a  href="">${name.category_name}</a>
//         `;
//      categoryList.addEventListener('click', (matched) => {
  
//           //  filterCards(name.category_name);
//           if(name.category_name===cardContainer.category){
//             return cardContainer.cardDiv;
//           }
//         });
        

//         allCategory.append(categoryList);
 
//       }
//  }

 
// const loadCard=()=>{
//     const url='https://openapi.programming-hero.com/api/plants';
//     fetch(url)
//     .then(res=>res.json()) 
//     .then(result=>allCards(result));
// }
// const allCards=(cardInfo)=>{
//   const plants=cardInfo.plants;
//   const cardContainer=document.getElementById("card-container");
//   cardContainer.innerHTML='';
//   for(const card of plants){
//     const cardDiv=document.createElement('div');
//     cardDiv.innerHTML=`
//         <div class="cards">
//         <div><img src="${card.image}" alt="image not fount"></div>
//      <div >
//     <h3 >${card.name}</h3>
//     <p>${card.description }</p>
//     <div>
//         <label for="">${card.category}</label>
//         <h3>${card.price}</h3>
//     </div>
//            <button   class="btn bg-[#15803D] text-white  mt-5 w-full rounded-3xl" >Add To Card</button>

// </div>
//      </div>
//     `
//     cardContainer.append(cardDiv);
   
//   }
   
// }
// loadCard();


