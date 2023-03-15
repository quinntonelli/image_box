var IMAGES = [];
var words = ['anger', 'ants', 'art', 'beach', 'beam',
             'beauty', 'black', 'bloom', 'blur', 'books',
             'born', 'breath', 'careful', 'casino', 'child', 
             'city', 'clothes', 'cord', 'crush', 'cry', 'cute', 
             'dance', 'death', 'earth', 'emblem', 'end', 'eye', 
             'face', 'fade', 'food', 'government', 'grass', 
             'growth', 'health', 'human', 'illegal', 'inspire', 
             'inspiring', 'islam', 'joy', 'kin', 'loss', 
             'love', 'magic', 'mall', 'moon', 'music', 'no', 
             'ocean', 'pain', 'painting', 'penthouse', 'pretty', 
             'problem', 'rail', 'random', 'real', 'religion', 
             'rest', 'road', 'sad', 'sensual', 'sky', 'sleep', 
             'soil', 'space', 'sun', 'sunset', 'swoon', 'textile', 
             'texture', 'time', 'tree', 'virtual', 'wall', 'war', 
             'warm', 'warmth', 'watch', 'wealth', 'weed', 'world'];

function initializeIDs(x){
    for(i = 0; i < x; i++){
        IMAGES.push("#" + String(i+1));
    }
}

function initializeImages(count){
    for(i = 0; i < count; i++){
        var targetID = String(i+1);
        var myImage = document.getElementById(targetID);
        var word = setRandomKeyword();
        link = ("https://loremflickr.com/256/256/" + word + "?random=" + (i+1));
        //console.log(link);
        myImage.src = link;
    }
}

function setRandomKeyword(){
    return words[Math.floor(Math.random() * words.length)];
}

function changeSRC(id){
    var myImage = document.getElementById(String(id));
    link = ("https://loremflickr.com/256/256/" + setRandomKeyword() + "?random=" + (id));
    if (myImage != null){
        myImage.src = link;
        //console.log(String(id) + " is now: " + String(link));
        //console.log(myImage.src);
    }
}

function changeRandomSRCXTimes(count, x, word){
    var targetID = 1;
    var changedIDs = []
    for(i = 0; i < (x+1); i++){
        while(changedIDs.includes(targetID)){
            targetID = Math.floor(Math.random() * count);
        }
        changedIDs.push(targetID);
        var myImage = document.getElementById(String(targetID));
        link = ("https://loremflickr.com/256/256/" + word + "?random=" + (targetID));
        if (myImage != null){
            myImage.src = link;
            //console.log(String(targetID) + " is now: " + String(link));
        }
    }
}

//COMPONENTS

AFRAME.registerComponent('cursor-change-color', {
    init: function () {
      this.el.addEventListener('fusing', function (evt) {
        var newColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        this.setAttribute('material', 'color', newColor);
      });
    }
});

AFRAME.registerComponent('cursor-change-opacity', {
//this one doesnt work
    init: function () {
        var x = 1.0;
        this.el.addEventListener('fusing', function (evt) {
            while (x > 0){
                this.setAttribute('material', 'opacity', x);
                x -= 0.01;
            }
        });
    }
})

AFRAME.registerComponent('cursor-change-src', {
    init: function () {
        var x = -1
        this.el.addEventListener('fusing', function (evt) {
            var y = x
            while (y == x){
                x = Math.floor(Math.random() * IMAGES.length);
            }
            this.setAttribute('src', IMAGES[x]);
            changeSRC(x);
        });
    }
})

AFRAME.registerComponent('cursor-change-src-and-color', {
    init: function () {
        var x = -1
        this.el.addEventListener('fusing', function (evt) {
            var y = x
            while (y == x){
                x = Math.floor(Math.random() * IMAGES.length);
            }
            this.setAttribute('src', IMAGES[x]);
            var newColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            this.setAttribute('material', 'color', newColor);
        });
    }
})

AFRAME.registerComponent('timed-change-src', {
    init: function () {
        var el = this.el
        var x = -1;
        var y = x;
        const interval = setInterval(function() {
            while (y == x){
                x = Math.floor(Math.random() * IMAGES.length);
            }
            y = x;
            el.setAttribute('src', IMAGES[x]);
            changeSRC(x);
          }, Math.random() * 10000);
    }
})

AFRAME.registerComponent('timed-and-cursor-change-src', {
    init: function () {
        var el = this.el
        var x = -1;
        var y = x;
        var waitTime = Math.floor(Math.random() * 10000)
        const interval = setInterval(function() {
            waitTime = Math.floor(Math.random() * 10000)
            while (y == x){
                x = Math.floor(Math.random() * IMAGES.length);
            }
            y = x;
            el.setAttribute('src', IMAGES[x]);
          }, waitTime);
          this.el.addEventListener('fusing', function (evt) {
            var y = x
            while (y == x){
                x = Math.floor(Math.random() * IMAGES.length);
            }
            this.setAttribute('src', IMAGES[x]);
        });
    }
})
