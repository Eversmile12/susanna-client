$(document).ready(function () {
    //Creates two canvas components to handle opacity -> We draw on the first component "draft" with a faked opacity thanks to css.
    // We then draw the canva onto the #main canvas with a lowered global alpha
  
    const canvas = $("#canvas").get(0);

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let eraserRadius = $("#eraser-radius").val();

    $("#eraser-radius").change(() =>{
        eraserRadius = $("#eraser-radius").val();
    } )

    
    console.log(eraserRadius)
    // Eraser picker change listener -> could be definitely handled in a better way....
    $('#eraser').change(()=> {
        isErasing = !isErasing;
    })

    $('#auto-process').change(()=>{
        isAuto = !isAuto
        if(isAuto){
            $(".tool-box").addClass("is-auto")
        }else{
            $(".tool-box").removeClass("is-auto");
        }
    })   
    

    // Defining painting and erasing bools
    let isPainting = false;
    let isErasing = $('#eraser').is(':checked');
    let isAuto = $("#auto-process").is(':checked');
    ctx.lineCap = "round";

    // Defining container to store saved mouse position
    let previousPosition;

    // Get cursor coords
    function getXY(e){
        var r = canvas.getBoundingClientRect();
        return {
            x: e.clientX-r.left,
            y: e.clientY - r.top
        };
    }
    
    // When mouseDown event gets triggered start capturing movements
    function onClickDown(e){
        console.log('mouse down');
        // Start panting
        isPainting = true;
        //Storing mouse position at current time
        previousPosition = getXY(e);
    };

    //When mouseup event is triggered: stop drawing, draw image on #main canvas and clear #draft .
    function onClickUp(){
        if(isAuto){
            processDrawing();
        }
        isPainting = false;
        console.log("endPosition()")
    };

    // When mousemove is triggered start drawing
    function onMouseMoving(e){        
        if(!isPainting) return;
        let currentPosition = getXY(e);

        // Update selected color and radius
        ctx.strokeStyle = "#bcbcbc";
        ctx.lineWidth = 2;
        // If it's erasing set color to white
        if(isErasing && isPainting){
            console.log(eraserRadius);
            ctx.strokeStyle = '#fff';   
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
    };

    

    // trigger calls on window click.
    let windowComponent = $(document);
    windowComponent.mousedown((e) => { 
        onClickDown(e);
    });
    windowComponent.mouseup(()=>{
        onClickUp();
    });
    windowComponent.mousemove(function (e) { 
        onMouseMoving(e);
        
    });
    $("#clear-canvas").click(()=>{
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        console.log("rect filled")
        $("#result-image").attr("src", "https://picsum.photos/600/600");
    })



    $('#process-drawing').click(()=>{
       processDrawing();
       
    })

    function processDrawing(){
        console.log("php called");
        let dataURL = canvas.toDataURL("img/jpeg");
        let image = UtoB(dataURL, "img/jpeg")
        let data = new FormData();
        data.append("img", image, "img.jpeg");
        console.log(data);
        $.ajax({
            url: "http://localhost:5000/predict",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function(data){
                $("#result-image").attr("src","http://localhost:5000/predict" )
            }
        })
    }
    function UtoB(dataURI, dataTYPE) {
        var binary = atob(dataURI.split(',')[1]), array = [];
        for(var i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
        return new Blob([new Uint8Array(array)], {type: dataTYPE});
    }
})



