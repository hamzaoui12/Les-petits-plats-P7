const filter1 = document.querySelector('.filter1');
const filter2 = document.querySelector('.filter2');
const filter3 = document.querySelector('.filter3');
const visiblefilter1 = document.querySelector('.f1-visiblepart');
const visiblefilter2 = document.querySelector('.f2-visiblepart');
const visiblefilter3 = document.querySelector('.f3-visiblepart');
const filterArrow1 = document.getElementById('filterArrow1');
const filterArrow2 = document.getElementById('filterArrow2');
const filterArrow3 = document.getElementById('filterArrow3');


visiblefilter1.addEventListener('click', function () {
    filterArrow1.classList.toggle('rotate180');
    filter1.classList.toggle('open');
});

visiblefilter2.addEventListener('click', function () {
    filterArrow2.classList.toggle('rotate180');
    filter2.classList.toggle('open');
});

visiblefilter3.addEventListener('click', function () {
    filterArrow3.classList.toggle('rotate180');
    filter3.classList.toggle('open');
});






