prediction = ""


Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera =document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LrpVUegfV/model.json',modelLoaded)

function modelLoaded()
{
    console.log('Model Loaded!')
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data ="The prediction is " + prediction;

    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results) {
    if (error){
        console.error(error)
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
     
        gesture = results[0].label;

 
      
        
        speak();
        
        if(gesture == "Thumbs Up")
        {
           
            document.getElementById("update_emoji").innerHTML = "&#128077; - Thumbs Up means Good Job";
        }
        
        if (gesture == "Full Hand")
        {
            
            document.getElementById("update_emoji").innerHTML = "&#128400; - The Full Hand emoji can either mean Stop or mean High Five";
        }
        
       if (gesture == "Fist")
        {
            
            document.getElementById("update_emoji").innerHTML = "&#9994; - A fist displayed in a position to punch someone, or to fist-bump another person.";
        }



   
   
    }

}