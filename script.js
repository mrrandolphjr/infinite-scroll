const imageContainer = document.getElementById('image-container');//image container 
const loader = document.getElementById('loader'); //loader


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];//photos array as global variable




//Unsplash API
let count = 5;
const apiKey = 'sxhbzRfHO3DyOg9dhZPXse_XrXoW9lmSTl25R4q2C6Y';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; 

//Check is all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        intialLoad = false;
        count = 30;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; 
    }
}


//Helper function to set Attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length;
    console.log('total images', totalImages);
    //Run function for each object in phtotsArray
    photoArray.forEach((photo) => {
        //Create and <a> to link Unsplash
        const item = document.createElement('a'); //create a blank item element
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank'); //this time were referring to a target and the blank will pass a string that will open new window
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
            
        });
        
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        });
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });
}

//set up fetch request 

//get photos from unsplash api
async function getPhotos(){
    try{
        const response = await fetch(apiURL); //apiKey fetch data it awaits from api URL
        photoArray = await response.json(); //the response will run through the json method and be returned as json
        displayPhotos();

    }catch (error) {
        //Catch Error Here
    }
}




// Check to see if scrolling near bottom of page, Load More Photots
window.addEventListener('scroll', () => {
if(window.innerHeight + window.scrollY >= document.body.offsetHeight -
    1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//On Loads
getPhotos();