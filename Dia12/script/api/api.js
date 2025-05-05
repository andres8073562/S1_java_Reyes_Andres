export const getGeneralInfoPeople= async() =>{
    const url = ("https://681813cd5a4b07b9d1cde489.mockapi.io/Usuarios");
    const option={
        method:"GET"
    };
    let res=await fetch(url,option);
    let data=await res.json();
    return data;
}