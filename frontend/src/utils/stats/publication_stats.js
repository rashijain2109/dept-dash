export const getPublicationHeader = (data) => {
    const thArray = ["ID", "Title", "Status", "Publication Type", "Authors"];
    return thArray;
}

export const getPublicationList = (data) => {
    var tdArray = [];
    for (var i in data){
        var temp = [];
        temp.push(data[i]["id"]);
        temp.push(data[i]["title"]);
        temp.push(data[i]["status"]);
        temp.push(data[i]["pub_type"]);
        var authors = "";
        for(var j in data[i]["authors"]){
            authors = authors+"  "+data[i]["authors"][j]["name"]+",";
        }
        temp.push(authors);
        tdArray.push(temp);
    }
    return tdArray;
}

export const getPublicationDetail = (data, i) => {
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

    temp.push("Publication Type");
    if(data[i]["pub_type"] == "CNF"){
        temp.push("Conference");
    }
    else if(data[i]["pub_type"] == "JRN"){
        temp.push("Journal");
    }
    else{
        temp.push("Other");
    }
    tdArray.push(temp);
    temp = [];

    temp.push("Publication Date");
    temp.push(data[i]["pub_date"]);
    tdArray.push(temp);
    temp = [];

    temp.push("DOI Number");
    temp.push(data[i]["doi_number"]);
    tdArray.push(temp);
    temp = [];

    temp.push("Page Number");
    temp.push(data[i]["page_number"]);
    tdArray.push(temp);
    temp = [];

    var authors = "";
    for(var j in data[i]["authors"]){
        authors = authors+"  "+data[i]["authors"][j]["name"]+",";
    }
    temp.push("Authors");
    temp.push(authors);
    tdArray.push(temp);

    return tdArray;
}