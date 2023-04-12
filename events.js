//options: flickr/picsum/multi
const database = "multi";
const recommendationsOn = false;

var imageSize = "256";

var IMAGES = [];

var words = ['anger', 'ants', 'art', 'beach', 'beam',
             'beauty', 'best', 'black', 'bloom', 'blur', 'books',
             'born', 'breath', "butterfly", 'careful', 'casino', 'child', 
             'city', 'clothes', 'court', 'crush', 'cry', 'cute', 
             'dance', 'death', 'earth', 'emblem', 'end', 'eye', 
             'face', 'fade', 'field', 'food', 'government', 'grass', 
             'growth', 'health', "heart", 'human', 'illegal', 'inspire', 
             'inspiring', 'islam', 'joy', 'kin', 'loss', 
             'love', 'magic', 'mall', 'moon', 'music', 'no', 
             'ocean', 'pain', 'painting', 'penthouse', 'pretty', 
             'problem', 'rail', 'random', 'real', 'religion', 
             'rest', 'road', 'sad', 'scenery', 'sensual', 'sky', 'sleep', 
             'soil', 'space', 'sun', 'sunset', 'swoon', 'textile', 
             'texture', 'time', 'tree', 'veil', 'view', 'virtual', 'wall', 
             'war', 'warm', 'warmth', 'watch', 'wealth', 'weed', 'world'];

var added_weight = [];

var in_use = ['#1', '#2', '#3', '#4', '#5', '#6'];

function setImageSize(x){
    imageSize = String(x);
}

function initializeIDs(count){
    for(i = 0; i < count; i++){
        IMAGES.push("#" + String(i+1));
    }
}

function initializeImages(count){
    for(i = 0; i < count; i++){
        var targetID = String(i+1);
        var myImage = document.getElementById(targetID);
        var link = generateLink(i+1);
        myImage.src = link;
    }
}

function setRandomKeyword(){
    return words[Math.floor(Math.random() * words.length)];
}

function generateRandomNumber(range){
    return Math.floor(Math.random() * range);
}

function generateLink(id){

    if(database == "flickr"){
        return ("https://loremflickr.com/" + imageSize + "/" + imageSize + "/" + setRandomKeyword() + "?random=" + (id));
    }

    if(database == "picsum"){
        return ("https://picsum.photos/seed/" + generateRandomNumber(9999) + "/" + imageSize);
    }

    if(database == "multi"){
        if(Math.random() > 0.2){
            return ("https://loremflickr.com/" + imageSize + "/" + imageSize + "/" + setRandomKeyword() + "?random=" + (id));
        } else {
            return ("https://picsum.photos/seed/" + generateRandomNumber(9999) + "/" + imageSize); 
        }
    }

}

function changeSRC(id){
    var newID = String(id).substring(1);
    var myImage = document.getElementById(newID);
    
    var link = generateLink(newID);

    if (myImage != null){
        myImage.src = link;
        //console.log(String(id) + " is now: " + String(link));
    }
}

function pushID(id){
    in_use.push(String(id));
}

function popID(id){
    var t = in_use.indexOf(id);
    in_use.splice(t, 1);
}

function increaseWordProbability(word){
    added_weight.push(word);
    //console.log(added_weight);
    words = words.concat(added_weight);
    //console.log(words.filter(word));
}

function getViewedWord(id){
    var newID = String(id).substring(1);
    //console.log(newID);
    var myImage = document.getElementById(newID);
    var sub = "";
    var src = "";
    console.log("getting viewed word");
    if (myImage != null){
        src = myImage.src;
        console.log("SRC: " + src);
        console.log("Substring: " + sub);
        sub = src.split("[\/?]")[5];
    }
    return sub;
}

//COMPONENTS

AFRAME.registerComponent('timed-change-src', {
    init: function () {
        var el = this.el;
        var x = "";
        var y = x;
        const interval = setInterval(function() {
            x = el.getAttribute('src');
            popID(x);
            y = x;
            changeSRC(x);
            while (y == x || in_use.includes(IMAGES[x])){
                x = Math.floor(Math.random() * IMAGES.length);
            } 
            
            el.setAttribute('src', IMAGES[x]);
            pushID(IMAGES[x]);
            
          }, (generateRandomNumber(7000)) + 1500);
    }
})

AFRAME.registerComponent('cursor-change-src', {
    init: function () {
        var x = "";
        var y = x;
        this.el.addEventListener('fusing', function (evt) {
            x = this.getAttribute('src');
            popID(x);
            if(recommendationsOn){
                increaseWordProbability(getViewedWord(x));
            }
            y = x;
            while (y == x || in_use.includes(IMAGES[x])){
                x = Math.floor(Math.random() * IMAGES.length);
            }
            changeSRC(x);
            this.setAttribute('src', IMAGES[x]);
            pushID(this.getAttribute('src'));
            y = x;
        });
    }
})





// AFRAME.registerComponent('cursor-change-src-and-color', {
//     init: function () {
//         var x = -1;
//         this.el.addEventListener('fusing', function (evt) {
//             var y = x
//             while (y == x){
//                 x = Math.floor(Math.random() * IMAGES.length);
//             }
//             this.setAttribute('src', IMAGES[x]);
//             var newColor = "#" + Math.floor(Math.random()*16777215).toString(16);
//             this.setAttribute('material', 'color', newColor);
//         });
//     }
// })

// AFRAME.registerComponent('timed-and-cursor-change-src', {
//     init: function () {
//         var el = this.el
//         var x = -1;
//         var y = x;
//         var waitTime = Math.floor(Math.random() * 10000)
//         const interval = setInterval(function() {
//             waitTime = Math.floor(Math.random() * 10000)
//             while (y == x){
//                 x = Math.floor(Math.random() * IMAGES.length);
//             }
//             y = x;
//             el.setAttribute('src', IMAGES[x]);
//           }, waitTime);
//           this.el.addEventListener('fusing', function (evt) {
//             var y = x
//             while (y == x){
//                 x = Math.floor(Math.random() * IMAGES.length);
//             }
//             this.setAttribute('src', IMAGES[x]);
//         });
//     }
// })

// AFRAME.registerComponent('cursor-change-color', {
//     init: function () {
//       this.el.addEventListener('fusing', function (evt) {
//         var newColor = "#" + Math.floor(Math.random()*16777215).toString(16);
//         this.setAttribute('material', 'color', newColor);
//       });
//     }
// });

// AFRAME.registerComponent('cursor-change-opacity', {
// //this one doesnt work
//     init: function () {
//         var x = 1.0;
//         this.el.addEventListener('fusing', function (evt) {
//             while (x > 0){
//                 this.setAttribute('material', 'opacity', x);
//                 x -= 0.01;
//             }
//         });
//     }
// })

// function changeRandomSRCXTimes(count, x, word){
//     var targetID = 1;
//     var changedIDs = []
//     for(i = 0; i < (x+1); i++){
//         while(changedIDs.includes(targetID)){
//             targetID = Math.floor(Math.random() * count);
//         }
//         changedIDs.push(targetID);
//         var myImage = document.getElementById(String(targetID));
//         link = ("https://loremflickr.com/256/256/" + word + "?random=" + (targetID));
//         if (myImage != null){
//             myImage.src = link;
//             //console.log(String(targetID) + " is now: " + String(link));
//         }
//     }
// }

// async function generateWord(){
//     try{
//         let w = await fetch('https://random-word-api.herokuapp.com/word');
//         let json = await w.json();
//         return String(json[0]);
//     } catch (error) {
//         console.log("ERROR");
//         console.log(error);
//     }
// }
