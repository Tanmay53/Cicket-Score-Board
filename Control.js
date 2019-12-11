var ovrKpr = 0.0;
var ttlrn = 0;
var strk = new Array(1, 0);
var nStrk = new Array(2, 0);
var hold = 0;
var wktKpr = 0;
var firstInning = 0;
function ovrs() {
    if(((ovrKpr * 10) % 10) >= 5) {
        ovrKpr += 0.5;
        strkSwap();
    }
    else {
        ovrKpr += 0.1;
    }
    ovrKpr = parseInt(Math.round(ovrKpr * 10)) / 10;
    $("#overs").text(ovrKpr);
}
function ttl(run) {
    ttlrn += run;
    $("#tot").text(ttlrn);
}
function runStrk(run) {
    strk[1] += run;
    $("#bSScore").text(strk[1]);
}
function strkSwap() {
    var temp1 = strk;
    strk = nStrk;
    nStrk = temp1;
    $("#bS").text(strk[0]);
    $("#bNS").text(nStrk[0]);
    $("#bSScore").text(strk[1]);
    $("#bNSScore").text(nStrk[1]);
}
function tableEvents() {
    $(".points").on("click", function() {
        var pnt = parseInt($(this).text());
        ttl(pnt);
        if(hold == 0) {
            runStrk(pnt);
            ovrs();
        }
        else {
            hold = 0;
            $("#ctHead").text("Runs");
            $("#ctHead").css("background-color", "#63ff8f");
            $(".btns").css("display", "table-row");
        }
        switch(pnt) {
            case 1:
            case 3:
                strkSwap();
                break;
        }
    });
    $(".extras").on("click", function() {
        var elmId = $(this).attr("id");
        var message = "Extra Runs";
        switch(elmId) {
            case "wkt":
                wktKpr += 1;
                $("#wkts").text(wktKpr);
                $(".pts").css("display", "none");
                $("#wktType").css("display", "table-row");
                message = "Bowled Player";
                ovrs();
                break;
            case "nb":
            case "wd":
                ttl(1);
                break;
            case "bye":
            case "lby":
                ovrs();
                break;
        }
        hold = 1;
        $("#ctHead").text(message);
        $("#ctHead").css("background-color", "#ff571e");
        $(".btns").css("display", "none");
    });
    $("#wS, #wNS").on("click", function() {
        var elemId = $(this).attr("id");
        var part = elemId.substr(1);
        if(part == "S") {
            strk = [(wktKpr + 2), 0];
        }
        else if(part == "NS"){
            nStrk = [(wktKpr + 2), 0];
        }
        $("#b" + part).text(wktKpr + 2);
        $("#b" + part + "Score").text("0");
        $(".pts").css("display", "table-row");
        $("#wktType").css("display", "none");
        $("#ctHead").text("Extra Runs");
        if(wktKpr == 10) {
            if(firstInning == 0) {
                $("#bS").text("1");
                $("#bNS").text("2");
                $("#bSScore").text("0");
                $("#bNSScore").text("0");
                $("#tot").text("0");
                $("#inngs").text(ttlrn);
                $("#wkts").text("0");
                $("#overs").text("0");
                firstInning = ttlrn;
                ttlrn = 0;
                ovrKpr = 0.0;
                strk = [1, 0];
                nStrk = [2, 0];
                hold = 0;
                wktKpr = 0;
            }
            else {
                if(firstInning > ttlrn) {
                    alert("First Batting Team is Winner!");
                }
                else if(firstInning < ttlrn) {
                    alert("Second Batting Team is Winner!");
                }
                else {
                    alert("It is a Tie!");
                }
            }
        }
    });
}