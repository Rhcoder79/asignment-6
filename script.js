 console.log('i am connected');
 let allPlansData=[];
const loadCategory=()=>{
  const url='https://openapi.programming-hero.com/api/categories';
  fetch(url)
  .then(response=>response.json())
  .then(jsonResult=>displayCategory(jsonResult.categories));
  
}

 const displayCategory=(categoryName)=>{
    
//     const categories=categoryName.categories
     const allCategory=document.getElementById("all-category");
    allCategory.innerHTML='';
    for(let name of categoryName){
   //  console.log(name);
         const categoryList=document.createElement('li');
         
       categoryList.innerHTML= `
              <a onclick="matched('${name.category_name}')" href="#">${name.category_name}</a>
              `;
         allCategory.append(categoryList);
        
    }
 } 
 loadCategory();
const loadCard=()=>{
    const url='https://openapi.programming-hero.com/api/plants';
    fetch(url)
    .then(res=>res.json()) 
    .then(result=>{
      allPlansData=result.plants;
      allCards(allPlansData);
    });
};
const loadPlantDetail=async(id)=>{
  const url=`https://openapi.programming-hero.com/api/plant/${id}`;
  //console.log(url);
  const res=await fetch(url);
  const details=await res.json();
displayPlantDetails(details.plants);
}
// {id: 5, image: 'https://i.ibb.co.com/qY8qS7YN/champa-min.jpg',
// name: 'Champa', description: 'A fragrant flowering tree that adorns gardens with…y cherished in traditional rituals and
//  perfumery.',
//    category: 'Flowering Tree', …}
const displayPlantDetails=(plant)=>{
console.log(plant);
const detailsCard=document.getElementById("details-container");
detailsCard.innerHTML=`
<h3 class="font-bold">${plant.name}</h3>
        <div><img src="${plant.image}" alt="image not fount"></div>
        <p><span class="font-bold">Category:</span> ${plant.category}</p>
        <h3><span class="font-bold">Price:</span> ${plant.price}</h3>
        <p><span class="font-bold">Description:</span> ${plant.description}</p>
        
`;
document.getElementById("plant_modal").showModal();
 
}


const allCards=(cardInfo)=>{
 // const plants=cardInfo.plants;
  const cardContainer=document.getElementById("card-container");
  cardContainer.innerHTML='';
  for(const card of cardInfo){
    const cardDiv=document.createElement('div');
    cardDiv.innerHTML=`
        <div class="cards">
        <div><img src="${card.image}" alt="image not fount"></div>
     <div >
    <h3 onclick="loadPlantDetail(${card.id})" >${card.name}</h3>
    <p>${card.description }</p>
    <div>
        <label for="">${card.category}</label>
        <h3>${card.price}</h3>
    </div>
           <button   class="btn bg-[#15803D] text-white  mt-5 w-full rounded-3xl" >Add To Card</button>

</div>
     </div>
    `; 
    cardContainer.append(cardDiv);
   
  }
 
}
loadCard();
// const modal=()=>{
//   fetch()
// }


const matched=(categoryName)=>{
const filterPlants=allPlansData.filter(card=>card.category===categoryName);
allCards(filterPlants);


 }


