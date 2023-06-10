

$(document).on("click", "#Connecter", function (e) {
    var formData = new FormData();
    formData.append("Id",1);
    formData.append("Username",$("#Uname").val());
    formData.append("Passewod",$("#Pass").val());
$.ajax({
    url: "https://localhost:5001/api/User",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
        if (response.success) {
            
           // let article = response.data;
           sessionStorage.setItem('username', $("#Uname").val());
           location.href="file:///D:/MouhanedPFE/Dotnet/BackuperConfigurator/Dashbord.html";
           
        }
        else {
            document.getElementById("message").innerHTML="donnee incorrectes";
        }
    },
    error: function (response) {
        alertify.error(response.message);
    }
});

});



$(document).on("click", "#ConnectWithToken", function (e) {
    var formData = new FormData();
    var AuthToken=document.getElementById("AuthToken").value;
    formData.append("Id",1);
    formData.append("AuthToken",AuthToken);
    formData.append("UserId",1);

    //var Interval=  document.getElementById("AuthToken").value;
   
    
$.ajax({
    url: "https://localhost:5001/api/Token",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
        if (response.success) {
            
           // let article = response.data;
           
           console.log(response.success);
           sessionStorage.setItem('username', "default");
           sessionStorage.setItem('tokensession', "tokenany");
           location.href="file:///D:/MouhanedPFE/Dotnet/BackuperConfigurator/Dashbord.html";
           
        }
        else {


            document.getElementById("message").innerHTML="donnee incorrectes";
        }
    },
    error: function (response) {
        alertify.error(response.message);
    }
});

});

 function showTokenBox(){
     document.getElementById("TokenLogin").style.display="block";
     document.getElementById("login").style.display="none";

}

$(document).on("click", "#TokenGenerateBtn", function (e) {
    var formData = new FormData();
    
    formData.append("Id",0);
    formData.append("AuthToken","default");
    formData.append("UserId",1);
    formData.append("Email",$("#Email").val());


$.ajax({
    url: "https://localhost:5001/api/Token",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
        if (response.success) {
            var token =response.data;
           // let article = response.data;
         $("#GeneratedToken").val(token.authToken);
         document.getElementById("GeneratedToken").innerHTML=token.authToken;
           console.log(token.authToken);
         
           
        }
        else {


           console.log("erreur");
        }
    },
    error: function (response) {
        alertify.error(response.message);
    }
});

});


$.ajax({
    url: "https://localhost:5001/api/Token",
    method: "GET",
    dataType:"json",
}).then(function(response){
    if(response.success){
        
        let Tokens=[];
        Tokens=response.data;
        function addLigne(ligne){
            $("#TokenListe").html(`${ligne}`);
        }
        function lignFromObjetc(Token){
        
            let ligne=`<tr id="${Token.id}">
            <td><div style=" color: forestgreen;"> ${Token.authToken}</div></td>
            
            <td><button onclick="deleteToken(${Token.id})">Supprimer</button></td>
          </tr>`;
          return ligne;
       
        }
        let lignes="";
        for(let Token of Tokens){
            lignes=lignes+lignFromObjetc(Token);
           
        }
        addLigne(lignes);
    }
    else{
        alertify.error(response.message);
    }
}).fail(function(response){
    alertify.error("API n\'est pas demmare");
});


function deleteToken(id){
    $.ajax({
        url: `https://localhost:5001/api/Token/${id}`,
        method: "Delete", 
       });
       document.getElementById(id).style.display="none";
}