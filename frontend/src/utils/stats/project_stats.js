export const getProjectHeader = (data) => {
    const thArray = ["ID", "Title", "Status", "Start Date", "End Date", "Authors", " "];
    return thArray;
}

export const getProjectList = (data) => {
    var tdArray = [];
    for (var i in data){
        var temp = [];
        temp.push(data[i]["id"]);
        temp.push(data[i]["title"]);
        temp.push(data[i]["status"]);
        temp.push(data[i]["start_date"]);
        temp.push(data[i]["end_date"]);
        var authors = "";
        for(var j in data[i]["authors"]){
            authors = authors+"  "+data[i]["authors"][j]["name"]+",";
        }
        temp.push(authors);
        tdArray.push(temp);
    }
    return tdArray;
}

export const getProjectDetail = (data, i) => {
    var tdArray = [];
    var temp = [];
    
    temp.push("ID");
    temp.push(data[i]["id"]);
    tdArray.push(temp);
    temp = [];

    temp.push("Title");
    temp.push(data[i]["title"]);
    tdArray.push(temp);
    temp = [];

    temp.push("Details");
    temp.push(data[i]["details"]);
    tdArray.push(temp);
    temp = [];

    temp.push("Status");
    if(data[i]["status"] == "ACT"){
        temp.push("Accepted");
    }
    else if(data[i]["status"] == "REJ"){
        temp.push("Rejected");
    }
    else if(data[i]["status"] == "COM"){
        temp.push("Communicated");
    }
    tdArray.push(temp);
    temp=[];

    temp.push("Start Date");
    temp.push(data[i]["start_date"]);
    tdArray.push(temp);
    temp = [];

    temp.push("End Date");
    temp.push(data[i]["end_date"]);
    tdArray.push(temp);
    temp = [];

    var authors="";

    temp.push("Proposed By");
    for(var j in data[i]["proposed_by"]){
        authors = authors+"  "+data[i]["proposed_by"][j]["name"]+",";
    }
    temp.push(authors);
    tdArray.push(temp);
    temp = [];

    temp.push("Agency");
    temp.push(data[i]["agency"]);
    tdArray.push(temp);
    temp = [];

    authors = "";
    for(var j in data[i]["authors"]){
        authors = authors+"  "+data[i]["authors"][j]["name"]+",";
    }
    temp.push("Authors");
    temp.push(authors);
    tdArray.push(temp);
    temp=[];

    temp.push("Scheme");
    temp.push(data[i]["scheme"]);
    tdArray.push(temp);
    temp = [];

    temp.push("send_date");
    temp.push(data[i]["send_date"]);
    tdArray.push(temp);
    temp = [];

    temp.push("Principal Investigator/Co-Principal Investigator");
    temp.push(data[i]["pi_copi"]);
    tdArray.push(temp);
    temp = [];
    return tdArray;
}