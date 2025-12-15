 console.log('i am connected');
 let allPlansData=[];
 let totalAmount=0;
 const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
  
    }else{
         document.getElementById('card-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}
const removeActive=()=>{
    const listContainer=document.querySelectorAll(".list-items")
listContainer.forEach((list)=>list.classList.remove('active'));

}
const loadCategory=()=>{
  const url='https://openapi.programming-hero.com/api/categories';
  fetch(url)
  .then(response=>response.json())
  .then(jsonResult=>displayCategory(jsonResult.categories));
  
}
//onclick="matched('${name.category_name}')"
 const displayCategory=(categoryName)=>{
    
//     const categories=categoryName.categories
     const allCategory=document.getElementById("all-category");
    allCategory.innerHTML='';
    for(let name of categoryName){
   //  console.log(name);
         const categoryList=document.createElement('li');
           categoryList.className='list-items btn btn-outline btn-primary center';
          
       categoryList.innerHTML= `
              <a   href="#">${name.category_name}</a>
              `;
              categoryList.addEventListener('click',function(){
                removeActive();
                this.classList.add('active');
                const nameToFilter=this.querySelector('a').innerText;
                matched(nameToFilter);
              });
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

const displayPlantDetails=(plant)=>{
console.log(plant);
const detailsCard=document.getElementById("details-container");
detailsCard.innerHTML=`
<h3 class="font-bold text-[#1f2937] text-xl">${plant.name}</h3>
        <div class='w-11/12 mx-auto h-56' ><img  class='w-[100%] h-[100%] object-cover' src="${plant.image}" alt="image not fount"></div>
        <p><span class="font-bold">Category:</span> ${plant.category}</p>
        <h3><span class="font-bold">Price:</span> ৳${plant.price}</h3>
        <p><span class="font-bold">Description:</span> ${plant.description}</p>
        
`;
document.getElementById("plant_modal").showModal();
 
}
//  document.getElementById("clear-btn" )
//  .addEventListener('click',function(){
//    document.getElementById('history-btn').remove()

//  })
// document.getElementById('cross')
// .addEventListener('click',function(){
//   document.getElementById()
// })
const cross=(element,itemPrice)=>{
const cardItemRemove=element.parentElement.parentElement.parentElement;
cardItemRemove.remove();
const priceConvert=parseInt(itemPrice);
totalAmount=totalAmount-priceConvert;
 const totalCalculation=document.getElementById('total');
 totalCalculation.innerHTML=`
    <h3 class='font-bold text-[#1f2937] text-right mr-2'>Total:৳${totalAmount}</h3>
    `;

}
const warn=(cardName,cardPrice)=>{
  alert(`${cardName} has been added to the card`);
    const addToCard=document.getElementById("add-to-cart")
    const addFeature=document.createElement('div');
    addFeature.className='card-item';
    
    addFeature.innerHTML=`
    <div  class='bg-[#8C8C8C]  rounded-md   flex justify-between items-center m-2 p-1'>
    <div  >
            <h3 class='font-bold text-[#1f2937]'>${cardName}</h3>
                <h3  class='font-semibold'>৳${cardPrice}</h3>
        </div>
        <div>
            <i onclick="cross(this,${cardPrice})" class="fa-solid fa-xmark cursor-pointer"></i>
        </div>
        </div>

    `;
    addToCard.append(addFeature);
    const priceConvert=parseInt(cardPrice);

     totalAmount=totalAmount+priceConvert;

    const totalCalculation=document.getElementById('total');
    totalCalculation.innerHTML=`
    <h3 class='font-bold text-[#1f2937] text-right mr-2'>Total:৳${totalAmount}</h3>
    `;
    //totalCalculation.append(totalCalculation);
    
  //console.log('card name:',cardName );
  //console.log('card price $:',cardPrice);
}

//onclick="alert('${card.name} has been added to the card')"
const allCards=(cardInfo)=>{
 // const plants=cardInfo.plants;
 
  const cardContainer=document.getElementById("card-container");
  cardContainer.innerHTML='';
  for(const card of cardInfo){
    const cardDiv=document.createElement('div');
    cardDiv.innerHTML=`
        <div class="cards">
        <div class='h-48 overflow-hidden' ><img class="w-full h-full object-cover" src="${card.image}" alt="image not fount"></div>
     <div >
    <h3 class="cursor-pointer" onclick="loadPlantDetail(${card.id})" >${card.name}</h3>
    <p>${card.description }</p>
    <div>
        <label for="">${card.category}</label>
        <h3>৳${card.price}</h3>
    </div>
           <button  onclick="warn('${card.name}',${card.price})"   class="btn bg-[#15803D] text-white  mt-5 w-full rounded-3xl" >Add To Card</button>

</div>
     </div>
    `; 
    cardContainer.append(cardDiv);
   
  }
  manageSpinner(false);
  
}
loadCard();

const matched=(categoryName)=>{
  manageSpinner(true);
  setTimeout(()=>{
const filterPlants=allPlansData.filter(card=>card.category===categoryName);
allCards(filterPlants);
  },200);
 }
 
