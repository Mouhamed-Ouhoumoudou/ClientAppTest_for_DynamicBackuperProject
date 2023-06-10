$(document).on("click", "#appliquer", function (e) {
    
    var formData = new FormData();
    
        formData.append("Id", 1);
  var Interval=  document.getElementById("Interval").value;
  var TypeInterval=document.getElementById("TypeInterval").value;
  formData.append("Interval", Interval);
  //formData.append("Heure", Heure);
  formData.append("TypeInterval",TypeInterval);
    // if (![null, undefined].includes($("#Interval").val())) {
    //     formData.append("Interval", $("#Interval").val());
    // }
    // if (![null, undefined].includes($("#Heure").val())) {
    //     formData.append("Heure", $("#Heure").val());
    // }
   
    //         formData.append("Etat", "default");
        
    //         formData.append("Message", "default");
        
     
    //    formData.append("DateBackup", "Default");
    
    // var BackupConfig = new Object();  
    // BackupConfig.Id=1;
    // BackupConfig.Interval=$("#Interval").val()
    // BackupConfig.Heure=$("#Heure").val()

    if (![null, undefined].includes(Interval)) {
    $.ajax({
        url: "https://localhost:44338/api/BackupPeriodique",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,  
    });   
}

});


$(document).on("click", "#planifierBtn", function (e) {

    var formData = new FormData();
    
        formData.append("Id", 0);

        function padTo2Digits(num) {
            
            return num.toString().padStart(2, '0');
          }//
          // cette fonction permet de formater une date de dd-mm-yyyy à dd/mm/yyyy
        //   (on a besoin de ce format car au niveau de C# c'est ce qui est utilisé)
          function formatDate(date) {
            return [
              padTo2Digits(date.getDate()),
              padTo2Digits(date.getMonth() + 1),
              date.getFullYear(),
            ].join('/');
          }
          var dt=new Date($("#dateExecution").val());
          var dateF= formatDate(dt).toString(); //+" "+padTo2Digits(dt.getHours()).toString()+":"+padTo2Digits(dt.getMinutes()).toString()+":00".toString();
    if (![null, undefined].includes($("#dateExecution").val())) {
        formData.append("DateExecution", dateF);
    }
    var minute=dt.getMinutes().toString();
    var heur=dt.getHours().toString();
    if(dt.getMinutes()<10){
        minute="0"+dt.getMinutes().toString();
    }
    if(dt.getHours()<10){
        heur="0"+dt.getHours().toString();
    }
    
    
    formData.append("TimeToExecute",heur+":"+minute)
        formData.append("DatePlanification", "17/03/2022");


        if (![null, undefined].includes($("#dateExecution").val())) {
   
    $.ajax({
        url: "https://localhost:44338/api/BackupPlanifier",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,  
    });   
}

});

function BackupManuele(){
    
    // $.ajax({
    //     url: "https://localhost:44338/api/Backup/BackupPlanifier",
    //     type: "post",
        
    // });   

    $.ajax({
        url: "https://localhost:44338/api/Backup/0",
        method: "GET",
        dataType:"json",
    });
}


// $.getjson("https://localhost:44338/api/Backup",{data: formData},function(respose){

// })

function deleteBackupJournal(id){

    $.ajax({
        url: `https://localhost:44338/api/Backup/${id}`,
        method: "Delete", 
       });
       document.getElementById(id).style.display="none";
}


    $.ajax({
        url: "https://localhost:44338/api/Backup",
        method: "GET",
        dataType:"json",
    }).then(function(response){
        if(response.success){
            
            let BackupJournals=[];
            BackupJournals=response.data;
            function addLigne(ligne){
                $("#BackupJournalListe").html(`${ligne}`);
            }
            function lignFromObjetc(BackupJournal){
            if(BackupJournal.etat=="Terminee"){
                let ligne=`<tr id="${BackupJournal.id}">
                <td><div style="background-color: forestgreen;color: white;"> ${BackupJournal.etat}</div></td>
                <td>${BackupJournal.message}</td>
                <td>${BackupJournal.dateBackup}</td>
                <td><button class="btn btn-outline-danger" type="button" onclick="deleteBackupJournal(${BackupJournal.id})">  <span><i class="bi bi-trash"></i> Supprimer</span></button></td>
              </tr>`;
              return ligne;
            }
            else if(BackupJournal.etat=="Attente"){
                let ligne=`<tr id="${BackupJournal.id}">
                <td><div style="background-color:coral; color: white;"> ${BackupJournal.etat}</div></td>
                <td>${BackupJournal.message}</td>
                <td>${BackupJournal.dateBackup}</td>
                <td><button  class="btn btn-outline-danger" onclick="deleteBackupJournal(${BackupJournal.id})">Supprimer</button></td>
              </tr>`;
              return ligne;
            }
            else{
                
                let ligne=`<tr id="${BackupJournal.id}">
                <td><div style="background-color: crimson;color: white;"> ${BackupJournal.etat}</div></td>
                <td>${BackupJournal.message}</td>
                <td>${BackupJournal.dateBackup}</td>
                <td><button class="btn btn-outline-danger" onclick="deleteBackupJournal(${BackupJournal.id})">Supprimer</button></td>
              </tr>`;
              return ligne;
            }
           
            }
            let lignes="";
            for(let BackupJournal of BackupJournals){
                lignes=lignes+lignFromObjetc(BackupJournal);
               
            }
            addLigne(lignes);
        }
        else{
            alertify.error(response.message);
        }
    }).fail(function(response){
        alertify.error("API n\'est pas demmare");
    });


function affiche(id){
    //document.getElementById("blockPlanifier")
    switch(id){
        case "BackupPeriodiqueBtn":
            $("#exampleModalLabel").html(`<h2>Backup Periodique</h2>`);
            $("#ModalContainer").html(`
            
            
        <form >
            <div class="form-group row">
                <label for="Interval">
                    Interval:
                </label>
                <input type="number"  id="Interval" placeholder="10" required>
                <br>  <label>Type Interval:</label><select id="TypeInterval">
                    <option value="jour">jour</option>
                    <option value="heure">heure</option>
                    <option value="minute">minute</option>  
                </select>
            </div>
          
           <div class="form-group row">
            <button class="btn btn-success "  type="button"  id="appliquer"><span><i class="fa fa-send"></i>Demarrer</span></button>
           </div>
            
        </form>
        `);
            break;
            case "BackupPlanifierBtn":
                $("#exampleModalLabel").html(`<h2>Backup Planifié</h2>`);
                $("#ModalContainer").html(`
                <form  >
                    <div class="form-group row">
                        <label for="dateExecution">
                            Date d'execution
                        </label>
                        <input  type="datetime-local"  id="dateExecution" placeholder="" required>
                       </div>
                       <!-- <div class="form-group row">
                        <label for="HeureExecution">
                            Heure (Facultatif):
                        </label>
                        <input  type="time"  id="HeureExecution" placeholder="">
                       </div> -->
                   <div class="form-group row">
                    <button class="btn btn-success "  type="button"  id="planifierBtn"><i class="fa fa-send"></i>planifier backup</span></button>
                   </div>
                    
                </form>`);
                break;
                case "BackupImediateBtn":
                    $("#exampleModalLabel").html(`<h2> Backup Immediat</h2>`);
                    $("#ModalContainer").html(`
                    <button id="BackupBtn" class="btn btn-success" onclick="BackupManuele()" >faire Backup</button>`);
    }

}

