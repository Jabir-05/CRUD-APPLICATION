let regForm = document.querySelector(".register-form");
let allInput = regForm.querySelectorAll("INPUT");
let allBtn =regForm.querySelectorAll("button");
let closeBtn = document.querySelector(".btn-close");
let regList = document.querySelector(".reg-list");
let addBtn = document.querySelector(".add-btn");
let searchEl = document.querySelector(".search");
let delAllBtn = document.querySelector(".delete-all-btn");



let allRegData =[];

let url =""

    if(localStorage.getItem("allRegData") != null)
    {
        allRegData = JSON.parse(localStorage.getItem("allRegData"));
       
    }
    

// adding data 
regForm.onsubmit = (e) =>{
    e.preventDefault(); 

    let checkEmail = allRegData.find((data)=> data.email == allInput[3].value);
    if(checkEmail == undefined){
        allRegData.push({
            name: allInput[0].value,
           enrollmemt : allInput [1].value,
           course : allInput[2].value,
           email : allInput[3].value,
           mobile :allInput[4].value,
           dob : allInput[5].value,
           photo:  url 
    
        });
        localStorage.setItem("allRegData",JSON.stringify(allRegData));
        swal("Data Insterted","successfully !","success");
        closeBtn.click();
        regForm.reset('');
        getRegData();

    }
    else{
        swal("Email allready exists", "failed","warning");
    }
    
}

const getRegData = () =>{
    regList.innerHTML = "";
    let filter = allRegData.slice();
    
    filter.forEach((data,index) =>{
        let dataStr =JSON.stringify(data);
        let finalData =dataStr.replace(/"/g,"'");
        console.log(data,index);
        regList.innerHTML += `
         <tr>
              <th>${index+1}</th>
              <td><img src="${data.photo}" width="30" alt=""></td>
              <td>${data.name}</td>
              <td>${data.enrollmemt}</td>
              <td>${data.course}</td>
              <td>${data.email}</td>
              <td>${data.dob}</td>
              <td>${data.mobile}</td>
              <td>
                  <button data="${finalData}" index = "${index}" class="edit-btn btn p-1 px-2 btn-primary">
                      <i class="fa fa-edit"></i>
                  </button>
                  <button index = "${index}" class="del-btn btn p-1 px-2 btn-danger">
                      <i class="fa fa-trash"></i>
                  </button>
              </td>
        </tr>
        `;

    });
    action();
}

// delete coding 
const action = () =>{
   let allDelBtn = regList.querySelectorAll(".del-btn");
   for(let btn of allDelBtn)
   {
    btn.onclick = async () =>{
      
        let isConfirm = await confirm();
        if(isConfirm ){
            let index = btn.getAttribute("index");
        allRegData.splice(index,1);
        localStorage.setItem("allRegData",JSON.stringify(allRegData))
        getRegData();
        }
       

        
    }
   }
// update coding 
 let allEditBtn = regList.querySelectorAll(".edit-btn");
 for(let btn of allEditBtn){
    btn.onclick = () =>{
        let index = btn.getAttribute("index");
        let dataStr = btn.getAttribute("data");
        let finalData =dataStr.replace(/'/g,'"')
        let data = JSON.parse(finalData);
        addBtn.click();
        allInput[0].value = data.name;
        allInput[1].value = data.enrollmemt;
        allInput[2].value = data.course;
        allInput[3].value = data.email;
        allInput[4].value = data.mobile;
        allInput[5].value = data.dob;
        url = data.photo;
        allBtn[0].disabled =false;
        allBtn[1].disabled =true;


        allBtn[0].onclick =() =>{
            allRegData[index]=
            {
                name: allInput[0].value,
               enrollmemt : allInput [1].value,
               course : allInput[2].value,
               email : allInput[3].value,
               mobile :allInput[4].value,
               dob : allInput[5].value,
               photo:  url 
        
            }
            localStorage.setItem("allRegData",JSON.stringify(allRegData));
        swal("Data Updated","successfully !","success");
        closeBtn.click();
        regForm.reset('');
        getRegData();
        allBtn[1].disabled =false;
        allBtn[0].disabled =true;

            
        }
        
    }
 }
}

getRegData(0,5);


 // reading photo
allInput[6].onchange = () =>{
    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[6].files[0]);
    fReader.onload =(e) =>{
        url = e.target.result;
        console.log(url);
    }
}

// delete all data 

delAllBtn.onclick = async () => {
    let isConfirm = await confirm();
    if (isConfirm) {
      localStorage.removeItem("allRegData");
      allRegData = [];
      getRegData();
    }
  };

// let confirm

let confirm = () =>{
    return new Promise ((resolve , reject )=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                resolve(true);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
                reject(false);
              swal("Your imaginary file is safe!");
            }
          });
          
    });
  
}  


// searching data 

searchEl.oninput = () =>{
    search();
}

const search =()=>{
   let value = searchEl.value.toLowerCase();
   let tr =  regList.querySelectorAll("TR");
   let i;
    for (i =0; i<tr.length;i++){
        let allTd = tr[i].querySelectorAll("Td");
        let name = allTd[1].innerHTML;
        let enrollmemt = allTd[2].innerHTML;
        let email = allTd[4].innerHTML;
        let dob = allTd[5].innerHTML;
        let mobile = allTd[6].innerHTML;
        
        if(name.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display ="";
        }
        else if(enrollmemt.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display ="";
        }
        else if(email.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display ="";
        }
        else if(dob.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display ="";
        }
        else if(mobile.toLocaleLowerCase().indexOf(value) != -1){
            tr[i].style.display ="";
        }
        else{
            tr[i].style.display ="none";
        }
        }
    }


  
  