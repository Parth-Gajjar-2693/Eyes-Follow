let eye_ref = document.querySelectorAll(".eye");

//mousemove for devices with mouse and t
//touchmove for tochscreen devices

let events = ["mousemove","tochmove"];

function isTouchDevice()
{
    try
    {
        document.createEvent("TouchEvent");
        return true;
    }
    catch(e){
        return false;
    }
}

//Same Function for both events.

events.forEach((eventsType) => {
    document.body.addEventListener(eventsType,events => {
        eye_ref.forEach((eye) => {
            /*getBoundingClientRect() method return the position
            relative to the viewport.*/
            let eyeX = eye.getBoundingClientRect().left + eye.clientWidth / 2;
            let eyeY = eye.getBoundingClientRect().top + eye.clientHeight / 2;

            /*ClientX and ClientY return the position of client
            cursor from top left of the screen.*/
            var x = !isTouchDevice() ? events.clientX : events.touches[0].clientX;
            var y = !isTouchDevice() ? events.clientY : events.touches[0].clientY;

            /*Subtract x position of mouse from x position of eye and 
              y position of mouse from y position of eye. 
              
              use atan2(return angle in radians*/
              let radians = Math.atan2(x - eyeX, y - eyeY);

              //Convert radins to degree.
              let rotationDegrees = radians * (180 / Math.PI) * -1 + 180;
              
              //Rotate the eye.
              eye.style.transform = "rotate(" + rotationDegrees + "deg)";
        });
    });
});