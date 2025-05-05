import {getGeneralInfoPeople} from "../api/api.js";
import {perfiles} from "../dom/people.js";

let input_search = document.querySelector('#input_search');
let main = document.querySelector(".main");

addEventListener("DOMContentLoaded",async ()=>{
    let data= await getGeneralInfoPeople();
    main.innerHTML= await perfiles(data);
    console.log("Holiiiii!!!");
    input_search.addEventListener("input",async pepito =>{
        
        const filtro = pepito.target.value.toLowerCase().trim();
        const personasFiltradas= data.filter(persona =>{
            return persona.name_full.toLowerCase().includes(filtro);
        });
        console.log(personasFiltradas);
        main.innerHTML = await perfiles(personasFiltradas);
    })


    
})