let navToggel = document.querySelector('#navbar__toggel'),
    navList  = document.querySelector('#navbar__list') ;

navToggel.addEventListener('click', function () {
    this.classList.toggle('open');
    navList.classList.toggle('nav-show');
});

/** 
    *  Slider Code
 **/
// Get Slider Items
let sliderItems = Array.from(document.querySelectorAll('.slider__item'));
console.table(sliderItems);
// Get Number of Sliders
 var sliderCount = sliderItems.length;
 console.log(sliderCount);

 // Set Current Slide
 var currentSlider = 1;


 // Slider Number Element 
 var sliderNumber = document.querySelector('#slider__number');

 // Previous and Next Buttons
let prevBtn = document.querySelector('#prev'),
    nextBtn = document.querySelector('#next');

 // Handle Click on previous and Next Buttons
prevBtn.addEventListener('click',prevSlider);
nextBtn.addEventListener('click',nextSlider);
// Create The list Element 
var bullitsList = document.createElement('ul');
 
// Set CLASS On List Element 
bullitsList.setAttribute('class', 'slider__bullets d-flex');

// Set ID On List Element 
bullitsList.setAttribute('id', 'slider__bullets');


for (var i = 1; i <= sliderCount; i++) {
    // Create The list item Element 
    var bullitsListItem = document.createElement('li');
    // Set CLASS On List Item Element 
    bullitsListItem.setAttribute('class', 'slider__bullets-item');
    // Set Custem Attribute =>  data-slide-to On List Item 
    bullitsListItem.setAttribute('data-slide-to', i);
    // add bullitsListItem on bullitsList
    bullitsList.appendChild(bullitsListItem);
    console.log(bullitsList);
}
// add bullitsList on Slider Control

document.querySelector('#slider__control').appendChild(bullitsList);

// Get Slider Items
let bullitsListAll = Array.from(document.querySelectorAll('.slider__bullets .slider__bullets-item')); 
// Trigger theChecker function
theChecker();


for (var i = 0; i < bullitsListAll.length; i++ ) {
    bullitsListAll[i].addEventListener('click', function () {
        currentSlider = this.getAttribute('data-slide-to');
        theChecker();
    });
}

//  Previous Slider Function
function prevSlider () {
    if (prevBtn.classList.contains('disabled')) {
        return false;
    } else {
        currentSlider--;
        theChecker();
    }
}
//  Next Slider Function
function nextSlider () {
    if (nextBtn.classList.contains('disabled')) {
        return false;
    } else {
        currentSlider++;
        theChecker();
    }
}



// The Checker
function theChecker() {
    // Set The Slide Number
    sliderNumber.textContent = `Slide # ${currentSlider} of ${sliderCount}`;
    // Trigger Remlove Active Class  
    removeActiveClass();

    // Set Active Class On Current Slide 
    sliderItems[currentSlider - 1].classList.add('active');

    // Set Active Class on Current Slider List Item
    bullitsList.children[currentSlider - 1].classList.add('active'); 
};

// Reamove Active Class From Slider Item & Bullites Item
function removeActiveClass() {
    // Remove Class Active from Slider Items
    sliderItems.forEach(function (item) {
        item.classList.remove('active');
    });

    // Remove Class Active from Bullit List 
    bullitsListAll.forEach( function (bullit) {
        bullit.classList.remove('active');
    });
}

if (currentSlider == 1 ) {
    prevBtn.classList.add('disabled');
} else{
    prevBtn.classList.remove('disabled');
}


if ( currentSlider == sliderCount ) {
    nextBtn.classList.add('disabled');
} else{
    nextBtn.classList.remove('disabled');
} 

 