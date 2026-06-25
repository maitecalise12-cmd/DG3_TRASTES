const glow=document.querySelector('.cursor-glow');
window.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});
window.addEventListener('scroll',()=>{document.querySelector('.hero').style.backgroundPositionY=(window.pageYOffset*0.4)+'px';});