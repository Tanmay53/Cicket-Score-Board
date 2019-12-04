$(document).ready(function() {
    orientationCheck();
});
window.addEventListener("orientationchange", function() { //Due to the pressence of resize event handler it can be removed without any side-effect.
    orientationCheck();
});
window.addEventListener("resize", function() {
    orientationCheck();
});
function orientationCheck() {
    var orient = screen.orientation.type;
    if((orient == "landscape-primary") || (orient == "landscape-secondary")) {
        $("#styleBOX").attr("href", "Front_End.css");
        pointsTable("landscapeTable.xml");
    }
    else {
        $("#styleBOX").attr("href", "Front_End_Mobile.css");
        pointsTable("portraitTable.xml");
    }
}
function pointsTable(fileName) {
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4) { //&& this.status inclusion; 
            displayTable(this);
        }
    }
    xmlhttp.open("GET", fileName, true);
    xmlhttp.send();
}
function displayTable(xml) {
    var xmlDOC = xml.responseXML;
    var x = xmlDOC.getElementsByTagName("row");
    var pTable = "";
    for(a = 0; a < x.length; a++) {
        pTable += "<tr";
        pTable += ((x[a].getAttribute("class") != null) ? (" class='" + x[a].getAttribute("class") + "'") : "");
        pTable += ((x[a].id != "") ? (" id='" + x[a].id + "'") : "");
        pTable += ">";
        var xa = x[a].getElementsByTagName("data");
        for(b = 0; b < xa.length; b++) {
            pTable += "<td";
            pTable += ((xa[b].id != "") ? (" id='" + xa[b].id + "'") : "");
            pTable += ((xa[b].getAttribute("class") != null) ? (" class='" + xa[b].getAttribute("class") + "'") : "");
            pTable += ((xa[b].getAttribute("colspan") != null) ? (" colspan='" + xa[b].getAttribute("colspan") + "'") : "");
            pTable += "> " + xa[b].childNodes[0].nodeValue + "</td>";
        }
        pTable += "</tr>";
    }
    $("#controllers tbody").html(pTable);
    tableEvents();
}