let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total")
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let mood='create';
let tmp;
//  console.log(title,price,taxes,ads,discount,count,category,submit,total);
function gettotal()
{
    if(price.value != '')
    {
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040'
    }
    else{
        total.innerHTML=""
        total.style.background='#820c0c'
    }    
}
let datapro;
if(localStorage.product !=null)
{
    datapro=JSON.parse(localStorage.product);
}
else
{
    datapro=[];
}

submit.onclick=function()
{
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value !='' && price.value !='' && category.value!='' &&newpro.count<100)
    {
        if(mood=='create')
        {
             if(newpro.count>1)
             {
                 for(let i=0;i<newpro.count;i++)
                 {
                     datapro.push(newpro);
                }
              }
            else
           {
               datapro.push(newpro);
              }
         }
        else{
          datapro[tmp]=newpro;
          mood='create';
          submit.innerHTML='Create';
         count.style.display='block';
    }
    cleardata();

    }
    else
    {
        
    }

    localStorage.setItem('product',JSON.stringify(datapro));
    showdata();
}

function cleardata()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    category.value='';
    count.value='';

}
function showdata()
{
    gettotal();
    let table='';
    for(let i=0;i<datapro.length;i++)
    {
        table+=`
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">Update</button></td>
            <td><button id="delete" onclick="deletedata(${i})">Delete</button></td> 
            </tr>            
             `
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById("deleteall");
    if(datapro.length>0)
    {
        btndelete.innerHTML=`
        <button onclick="deleteAll()">Delete All (${datapro.length})</button>
        `
    }
    else{
        btndelete.innerHTML=``;

    }
}
function deleteAll()
{
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

showdata();
function deletedata(i)
{
    
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showdata();

}
let searchmood='title';
function getsearchmood(id)
{
    let search=document.getElementById('search');
    if(id=='searchtitle')
    {
        searchmood='title';
    }
    else{
        searchmood='category';
    }
    search.placeholder='Search By '+{searchmood};

    search.focus();
    search.value='';
    showdata();
}
function searchdata(value)
{
    let table='';
    for(let i=0;i<datapro.length;i++){

    
    
    if(searchmood=='title')
    {
       
            if(datapro[i].title.includes(value.toLowerCase()))
            {
                table+=`
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button id="update">Update</button></td>
                    <td><button id="delete" onclick="deletedata(${i})">Delete</button></td> 
                    </tr>            
                     `

            }
        
    }
    else{
        
        
            if(datapro[i].category.includes(value.toLowerCase()))
            {
                table+=`
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button id="update">Update</button></td>
                    <td><button id="delete" onclick="deletedata(${i})">Delete</button></td> 
                    </tr>            
                     `

            }
        
    }
}
    document.getElementById('tbody').innerHTML=table;

}

function updatedata(i)
{
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    category.value=datapro[i].category;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal();
    count.style.display='none';
    taxes.value=datapro[i].taxes;
    submit.innerHTML='Update';
    mood='update';
    tmp=i;
    scroll({
        top : 0,
        behavior:"smooth"
})

}

