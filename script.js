// hero: activa la animación de entrada del hero
document.querySelectorAll('[data-controller~="hero"]').forEach((element) => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      element.classList.add("in")
    }, 60)
  })
})

// navbar: muestra la barra fija al pasar los 160px de scroll
document.querySelectorAll('[data-controller~="navbar"]').forEach((element) => {
  const onScroll = () => {
    element.classList.toggle("navbar--visible", window.scrollY > 160)
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  onScroll()
})

// reveal: revela cada bloque cuando entra en pantalla
const revealElements = document.querySelectorAll('[data-controller~="reveal"]')

if (typeof IntersectionObserver === "undefined") {
  revealElements.forEach((element) => element.classList.add("in"))
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in")
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08 })

  revealElements.forEach((element) => observer.observe(element))
}

document.addEventListener('DOMContentLoaded', function () {
  var visitor = ''
  var linkPressed = ''
  var toTheEnd = ''

  function detectMode() {
    if (window.matchMedia('(min-width: 900px)').matches) {
      return "escritorio";
    } else {
      return "móvil";
    }
  }

  function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  function sendForm() {
    const datum = new FormData();
    datum.append('entry.483544682', visitor);
    datum.append('entry.635905757', detectMode());
    datum.append('entry.1907158582', linkPressed);
    datum.append('entry.480701446', toTheEnd);
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSeCrsx9UlCMFvvGl4XPoPlNjOI3_kDHp0_FlV8tNVtQWvd7ug/formResponse', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      mode: 'no-cors',
      body: datum,
    });
  }

  if (localStorage.getItem('minga') == null){
    visitor = getRandomString(20)
    localStorage.setItem('minga', visitor)
  }
  else{
    visitor = localStorage.getItem('minga')
  }

  // tomamos los dos .footer desktop y footer
  const fin = document.querySelectorAll('.footer__wordmark');

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      toTheEnd = "si";
      sendForm()
    }
  });


  // escuchar links
  document.body.addEventListener("click", function(e) {
    if(e.target && e.target.nodeName == "A") {
      linkPressed = e.target.innerText;
      sendForm()
    }
  });

  fin.forEach((element) => observer.observe(element));
  detectMode()
  sendForm()
});
