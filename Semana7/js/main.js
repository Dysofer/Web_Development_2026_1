document.addEventListener('DOMContentLoaded', () => {

const canvas = document.getElementById('product-canvas');
const context = canvas.getContext('2d');

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 742;

const currentFrame = index => (
`./Secuencia/${(index+1).toString().padStart(4,'0')}.png`
);

const images = [];

for(let i=0;i<frameCount;i++){

const img = new Image();
img.src = currentFrame(i);

images.push(img);

}

images[0].onload = ()=>{

context.drawImage(images[0],0,0);

}

window.addEventListener('scroll',()=>{

const scrollTop = window.scrollY;

const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

const scrollFraction = scrollTop / maxScroll;

const frameIndex = Math.min(

frameCount-1,
Math.floor(scrollFraction*frameCount)

);

requestAnimationFrame(()=>{

context.drawImage(images[frameIndex],0,0);

});

});

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){
entry.target.classList.add('visible')
}else{
entry.target.classList.remove('visible')
}

})

},{threshold:0.5})

const cards = document.querySelectorAll('.card')

cards.forEach(card=>observer.observe(card))

});