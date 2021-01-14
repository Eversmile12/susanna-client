$(document).ready(function () {
    //Creates two canvas components to handle opacity -> We draw on the first component "draft" with a faked opacity thanks to css.
    // We then draw the canva onto the #main canvas with a lowered global alpha

    const draft = $("#draft").get(0);
    const main = $("#main").get(0);

    // Two contexts for the same reason as above
    const ctx = draft.getContext("2d");
    const mctx = main.getContext("2d");

    // Getting modifiers values
    // Set alpha as decimal ex. 0.xy
    let alpha = $('#alpha-selector').val()/100;
    let color = $('#colorPicker').val();
    let radius= $('#radius-selector').val();
    

    // Color picker change listener
    $('#colorPicker').change(()=>{
        color = $("#colorPicker").val();
    });

    // Radius selector change listener
    $('#radius-selector').change(() =>{
        radius = $('#radius-selector').val();
        $('#radius-label').text(radius);
    });

    // Alpha selector change listener
    $('#alpha-selector').change(() =>{
        alpha = $('#alpha-selector').val()/100;
    });

    // Eraser picker change listener -> could be definitely handled in a better way....
    $('#eraser').change(()=> {
        isErasing = !isErasing;
    })

    // Defining painting and erasing bools
    let isPainting = false;
    let isErasing = $('#eraser').is(':checked');

    ctx.lineCap = "round";

    // Defining container to store saved mouse position
    let previousPosition;

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
        isPainting = false;
        console.log("endPosition()")
        mctx.drawImage(draft,0,0);
        ctx.clearRect(0,0, draft.width, draft.height)
    };

    // When mousemove is triggered start drawing
    function onMouseMoving(e){
        
        if(!isPainting) return;

        let currentPosition = getXY(e);
        // Update alpha style css 
        draft.style.opacity = alpha;
        //Update main canvas globalAlpha
        mctx.globalAlpha = alpha;
        // Update selected color and radius
        ctx.strokeStyle = color;
        ctx.lineWidth = radius;
        // If it's erasing set color to white
        if(isErasing && isPainting){
            ctx.strokeStyle = '#fff';            
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

    // Get cursor coords
    function getXY(e){
        var r = draft.getBoundingClientRect();
        return {
            x: e.clientX-r.left,
            y: e.clientY - r.top
        };
    }

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


    $('#process-drawing').click(()=>{
        let dataURL = main.toDataURL();
        $.post("http://localhost:8081/client-susanna/save-image.php",
            {
                img: dataURL,
            },
        (res, status) => {
            
            console.log(res);
        }
        );
    })
})
