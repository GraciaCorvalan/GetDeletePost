
const apiUrl = `https://jsonplaceholder.typicode.com/`;

const Form = document.getElementById('form');
const Details = document.getElementById('Details');
let divdetails;

Form.addEventListener('submit' , (event)=>{
  event.preventDefault();
  const searchValue= document.getElementById('search').value.trim();
  getDetails(searchValue);
 
});

async function getDetails(searchValue) {
  try{
   
    const response = await fetch(apiUrl + `posts/${searchValue}`);
    const Data = await response.json();
    console.log(Data);
   
    const Nametitle = Data.title;
    const bodyPost = Data.body;
         divdetails = document.createElement('div');
    const deleteButton = document.createElement('button');
    deleteButton.textContent="Eliminar post"
    console.log(deleteButton)
    const postHtml = `
    <h2>${searchValue}. ${Nametitle}</h2>
    <p>Body: ${bodyPost}</p>
    `;
   

    deleteButton.classList.add(searchValue);
    let clase = deleteButton.getAttribute('class');
    divdetails.classList.add(`nombreclase${searchValue}`)
    divdetails.classList.add("cuadro");

    divdetails.innerHTML = postHtml;
    divdetails.appendChild(deleteButton);
    console.log(divdetails)
    deleteButton.disabled = false;
    Details.appendChild(divdetails);
    deleteButton.addEventListener('click' , () => deletePost(clase));
    
   
  } catch (error){
    console.error("Erro al obtener datos del post " , error);
    Details.innerHTML = "<p>No encontrado</p>";
    deleteButton.disabled = true;
  }
}



async function deletePost(num) {
  try{
    //const searchValue = document.getElementById('search').value.trim();
    const eldiv = document.querySelector(`.nombreclase${num}`)
    const response = await fetch(apiUrl + `posts/${num}` , {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('POST N°' + num + ' ELIMINADO CORRECTAMENTE');
      
      //deleteButton.disabled = true;
      
      Details.removeChild(eldiv);
      //eldiv.remove();
      //eldiv.innerHTML=" ";
      
    } else {
      alert('Error al eliminar')
    }
   
  } catch (error){
    console.error("error al obtener el POST " , error);
  }
};