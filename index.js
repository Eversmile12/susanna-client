$(document).ready(function () {
    //Creates two canvas components to handle opacity -> We draw on the first component "draft" with a faked opacity thanks to css.
    // We then draw the canva onto the #main canvas with a lowered global alpha

   fetchAndSetRandImage();
   replaceHeaderLetter();

    const canvas = $("#canvas").get(0);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let eraserRadius = $("#eraser-radius").val();

    $("#eraser-radius").change(() => {
        eraserRadius = $("#eraser-radius").val();
    });

    $(".main-header").mouseenter(mixHeader).mouseleave(restoreHeader);
    console.log(eraserRadius);
    // Eraser picker change listener -> could be definitely handled in a better way....
    // $("#eraser").click(() => {
    //     isErasing = !isErasing;
    // });

    $(".activable").click((e) => {
        
        $("#" + e.currentTarget.id).toggleClass("is-active");
        if (e.currentTarget.id == "auto-process") {
            isAuto = !isAuto;
        }else{
            isErasing = !isErasing;
            
        }
    });

    // Defining painting and erasing bools
    let isPainting = false;
    let isErasing = false;
    let isAuto = false;
    ctx.lineCap = "round";

    // Defining container to store saved mouse position
    let previousPosition;

    // Get cursor coords
    function getXY(e) {
        var r = canvas.getBoundingClientRect();
        return {
            x: e.clientX - r.left,
            y: e.clientY - r.top,
        };
    }

    // When mouseDown event gets triggered start capturing movements
    function onClickDown(e) {
        console.log("mouse down");
        // Start panting
        isPainting = true;
        //Storing mouse position at current time
        previousPosition = getXY(e);
    }

    //When mouseup event is triggered: stop drawing, draw image on #main canvas and clear #draft .
    function onClickUp() {
        if (isAuto) {
            processDrawing();
        } 

        isPainting = false;
        
    }

    // When mousemove is triggered start drawing
    function onMouseMoving(e) {
        if (!isPainting) return;
        let currentPosition = getXY(e);

        // Update selected color and radius
        ctx.strokeStyle = "#bcbcbc";
        ctx.lineWidth = 2;
        // If it's erasing set color to white
        if (isErasing && isPainting) {
            console.log(eraserRadius);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = eraserRadius;
        }

        // Start drawing
        ctx.beginPath();
        // from previous position coords
        ctx.moveTo(previousPosition.x, previousPosition.y);
        // to current position cords;
        ctx.lineTo(currentPosition.x, currentPosition.y);
        // set the stroke
        ctx.stroke();

        // previous position is now the current/old one
        previousPosition = currentPosition;
    }

    // trigger calls on window click.
    let windowComponent = $(document);
    windowComponent.mousedown((e) => {
        onClickDown(e);
    });
    windowComponent.mouseup(() => {
        onClickUp();
    });
    windowComponent.mousemove(function (e) {
        onMouseMoving(e);
    });
    $("#clear-canvas").click(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        console.log("rect filled");
        fetchAndSetRandImage();
    });

    $("#process-drawing").click(() => {
        console.log("Process drawing clicked");
        processDrawing();
    });

    function processDrawing() {
        console.log("php called");
        let dataURL = canvas.toDataURL("img/jpeg");
        let image = UtoB(dataURL, "img/jpeg");
        let data = new FormData();
        data.append("img", image, "img.jpeg");
        console.log(data);
        $.ajax({
            url: "http://localhost:5000/predict",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            method: "POST",
            success: function (data) {
                $("#result-image").attr("src", "http://localhost:5000/predict");
                $("#download-image").attr("href", "http://localhost:5000/predict");
            },
        });
    }
    function UtoB(dataURI, dataTYPE) {
        var binary = atob(dataURI.split(",")[1]),
            array = [];
        for (var i = 0; i < binary.length; i++)
            array.push(binary.charCodeAt(i));
        return new Blob([new Uint8Array(array)], { type: dataTYPE });
    }
});

function mixHeader(){
    $(".main-header").text("01011_001")
}

function restoreHeader(){
    $(".main-header").text("NARCISO_")
    replaceHeaderLetter();
}

function fetchAndSetRandImage(){
     let images = "output0_fake_B.png output1_fake_B.png output10_fake_B.png output100_fake_B.png output101_fake_B.png output102_fake_B.png output103_fake_B.png output104_fake_B.png output105_fake_B.png output106_fake_B.png output107_fake_B.png output108_fake_B.png output109_fake_B.png output11_fake_B.png output110_fake_B.png output111_fake_B.png output112_fake_B.png output113_fake_B.png output114_fake_B.png output115_fake_B.png output116_fake_B.png output117_fake_B.png output118_fake_B.png output119_fake_B.png output12_fake_B.png output120_fake_B.png output121_fake_B.png output122_fake_B.png output123_fake_B.png output124_fake_B.png output125_fake_B.png output126_fake_B.png output127_fake_B.png output128_fake_B.png output129_fake_B.png output13_fake_B.png output130_fake_B.png output131_fake_B.png output132_fake_B.png output133_fake_B.png output134_fake_B.png output135_fake_B.png output136_fake_B.png output137_fake_B.png output138_fake_B.png output139_fake_B.png output14_fake_B.png output140_fake_B.png output141_fake_B.png output142_fake_B.png output143_fake_B.png output144_fake_B.png output145_fake_B.png output146_fake_B.png output147_fake_B.png output148_fake_B.png output149_fake_B.png output15_fake_B.png output150_fake_B.png output151_fake_B.png output152_fake_B.png output153_fake_B.png output154_fake_B.png output155_fake_B.png output156_fake_B.png output157_fake_B.png output158_fake_B.png output159_fake_B.png output16_fake_B.png output160_fake_B.png output161_fake_B.png output162_fake_B.png output163_fake_B.png output164_fake_B.png output165_fake_B.png output166_fake_B.png output167_fake_B.png output168_fake_B.png output169_fake_B.png output17_fake_B.png output170_fake_B.png output171_fake_B.png output172_fake_B.png output173_fake_B.png output174_fake_B.png output175_fake_B.png output176_fake_B.png output177_fake_B.png output178_fake_B.png output179_fake_B.png output18_fake_B.png output180_fake_B.png output181_fake_B.png output182_fake_B.png output183_fake_B.png output184_fake_B.png output185_fake_B.png output186_fake_B.png output187_fake_B.png output188_fake_B.png output19_fake_B.png output2_fake_B.png output20_fake_B.png output21_fake_B.png output22_fake_B.png output23_fake_B.png output24_fake_B.png output25_fake_B.png output26_fake_B.png output27_fake_B.png output28_fake_B.png output29_fake_B.png output3_fake_B.png output30_fake_B.png output31_fake_B.png output32_fake_B.png output33_fake_B.png output34_fake_B.png output35_fake_B.png output36_fake_B.png output37_fake_B.png output38_fake_B.png output39_fake_B.png output4_fake_B.png output40_fake_B.png output41_fake_B.png output42_fake_B.png output43_fake_B.png output44_fake_B.png output45_fake_B.png output46_fake_B.png output47_fake_B.png output48_fake_B.png output49_fake_B.png output5_fake_B.png output50_fake_B.png output51_fake_B.png output52_fake_B.png output53_fake_B.png output54_fake_B.png output55_fake_B.png output56_fake_B.png output57_fake_B.png output58_fake_B.png output59_fake_B.png output6_fake_B.png output60_fake_B.png output61_fake_B.png output62_fake_B.png output63_fake_B.png output64_fake_B.png output65_fake_B.png output66_fake_B.png output67_fake_B.png output68_fake_B.png output69_fake_B.png output7_fake_B.png output70_fake_B.png output71_fake_B.png output72_fake_B.png output73_fake_B.png output74_fake_B.png output75_fake_B.png output76_fake_B.png output77_fake_B.png output78_fake_B.png output79_fake_B.png output8_fake_B.png output80_fake_B.png output81_fake_B.png output82_fake_B.png output83_fake_B.png output84_fake_B.png output85_fake_B.png output86_fake_B.png output87_fake_B.png output88_fake_B.png output89_fake_B.png output9_fake_B.png output90_fake_B.png output91_fake_B.png output92_fake_B.png output93_fake_B.png output94_fake_B.png output95_fake_B.png output96_fake_B.png output97_fake_B.png output98_fake_B.png output99_fake_B.png printFiles.sh";
    images = images.split(" ");
    console.log(images)
    var imageIndex = Math.round(Math.random()*(images.length-1));

    $("#result-image").attr("src", "./graphics-assets/images/"+images[imageIndex]);
    $("#download-image").attr("href", "./graphics-assets/images/"+images[imageIndex]);
}

function replaceHeaderLetter(){
    let lettersInTitle = ["N","A","R","C","I", "S", "O"];
    let randomCharacters = ["µ", "¿", "Ð", "Ö", "Ø", "Ý", "ð", "Ƈ", "Ǝ", "Ƣ"];
    let letterToChange = Math.round(Math.random()*(lettersInTitle.length-1));
    let randomToInsert = Math.round(Math.random()*(randomCharacters.length-1));
    
    let header = $(".main-header").text();
    header = header.replace(lettersInTitle[letterToChange], randomCharacters[randomToInsert]);
    $(".main-header").text(header);
}