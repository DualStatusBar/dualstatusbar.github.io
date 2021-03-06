  function navbar() {
      var t = this;
      t.n = document.querySelector("nav");
      t.bo = document.body.style.overflow;
      t.close = function () {
          t.bo = "auto";
          t.n.classList.remove("active");
      }
      t.open = function () {
          t.bo = "hidden";
          t.n.classList.add("active");
      }
      if (t.n) {
          document.querySelector("nav>button").addEventListener("click", function () {
              console.log("toggleNav");
              if (t.n.classList.contains("active"))
                  t.close();
              else
                  t.open();
          });
          document.querySelectorAll("nav ul > a").forEach(n => n.addEventListener("click", t.close()));
      }
  }

  function modal(id) {
      var t = this;
      t.m = document.querySelector((id) ? id : '.modal');
      if (t.m) {
          t.bdy = document.body.classList;
          t.targets = document.querySelectorAll('[data-toggle="' + t.m.id + '"]');
          t.closebtns = t.m.querySelectorAll('.close-modal');
      }
      t.show = function () {
          t.bdy.add('_overflowhidden');
          t.m.classList.add('_show-modal');
      }
      t.hide = function () {
          t.m.classList.remove('_show-modal');
          t.bdy.remove('_overflowhidden');
      }
      t.listeners = function () {
          t.targets.forEach(el => {
              el.addEventListener('click', function (e) {
                  t.show();
              });
          });
          t.closebtns.forEach(function (item) {
              item.addEventListener('click', function (e) {
                  t.hide();
              });
          });
      }
      if (t.m)
          t.listeners();
  }

  function themeManager() {
      const t = this;
      t.toggles = document.getElementsByClassName("theme-toggle");
      t.activeTheme = "light";
      t.setTheme = (theme) => {
          t.activeTheme = theme;
          document.documentElement.setAttribute('data-theme', theme)
          localStorage.setItem('theme', theme);
      }
      t.dark = () => {
          t.setTheme("dark");
      }
      t.light = () => {
          t.setTheme("light");
      }
      if (window.CSS && CSS.supports("color", "var(--bg)") && t.toggles) {
          var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ?
              "dark" : "light");
          if (storedTheme)
              document.documentElement.setAttribute('data-theme', storedTheme)
          for (var i = 0; i < t.toggles.length; i++) {
              t.toggles[i].onclick = function () {
                  if (document.documentElement.getAttribute("data-theme") === "light") t.dark();
                  else t.light();
              };
          }
      }
  }

  function aos() {
      const t = this;
      t.items = document.querySelectorAll("[class*=_aos]");
      if (IntersectionObserver && t.items) {
          let callback = function (entries) {
              entries.forEach(entry => {
                  if (entry.isIntersecting && !entry.target.classList.contains('_aos-done')) {
                      entry.target.classList.add('_aos-done');
                  } else {
                      entry.target.classList.remove('_aos-done');
                  }
              });
          }
          let observer = new IntersectionObserver(callback, {
              root: null,
              threshold: 0
          });
          t.items.forEach((item) => {
              observer.observe(item);
          });
      }
  }

  function gotop() {
      var t = this;
      t.gt = document.getElementById('gt-link');
      t.scrollToTop = function () {
          window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth'
          });
      }
      t.listeners = function () {
          window.addEventListener("scroll", () => {
              let y = window.scrollY;
              if (y > 0) {
                  t.gt.classList.remove("hidden");
              } else {
                  t.gt.classList.add("hidden");
              }
          });
          t.gt.onclick = function (e) {
              e.preventDefault();
              if (document.documentElement.scrollTop || document.body.scrollTop > 0) {
                  t.scrollToTop();
              }
          }
      }
      if (t.gt) {
          t.listeners();
      }
  }

  function pagesRoute() {
      var t = this;
      const notFoundPage = document.querySelector("#notFound");
      t.links = Array.from(document.querySelectorAll('[topage]'));
      t.scrollTop = () => {
          document.querySelector('html').scrollTop = 0;
          document.querySelector('body').scrollTop = 0;
      }
      t.navigate = (id) => {
          //Hide current active page
          var activePage = document.querySelector("section.page-active");
          if (activePage) activePage.classList.remove("page-active");
          var activeLink = document.querySelector('[topage].active');
          if (activeLink) activeLink.classList.remove("active");
          //Show the next page
          var nextPage = document.querySelector(id);
          if (nextPage) nextPage.classList.add("page-active");
          var nextLink = document.querySelector("[topage='" + id + "']");
          if (nextLink) nextLink.classList.add("active");
          //Scroll to top
          t.scrollTop();
          //Set history state
          if (history.pushState)
              history.pushState(null, null, id);
          else
              location.hash = id;
      }
      t.listeners = () => {
          t.links.forEach((page) => {
              var id = page.getAttribute("topage");
              page.addEventListener('click', () => {
                  t.navigate(id)
              });
          })
      }
      if (t.links) {
          if (window.location.hash)
              t.navigate(window.location.hash);
          t.listeners();
      }
  }

  // Call the function when the DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
      new themeManager();
      new navbar();
      new gotop();

      new modal("#mdl1");
      pagesRoute();

  });

  function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue, randomIndex;
      return array;
  }

  function appendData(data) {
      var ext_grid = document.getElementById("ext-grid");
      for (var i = 0; i < data.length; i++) {
          var div = document.createElement("div");
          var links = '<a href="' + data[i].githuburl + '" class="btn" target="_blank"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg> &nbsp; DOWNLOAD</a>';
          div.className = "col-4";
          div.innerHTML = '<div class="card  _aos-bottom"><div class="badges"><div>' + data[i].category + '</div></div>' +
              '<div class="img-w"><img src="' + data[i].logo + '" alt=""></div>' +
              '<h3 class="_txt-center">' + data[i].name + '</h3><p>' + data[i].description + '</p><div class="links">' + links + '</div></div>';
          ext_grid.appendChild(div);
      }
  }
  fetch('https://raw.githubusercontent.com/DualStatusBar/dualstatusbar.github.io/main/miui/data.json')
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          appendData(shuffle(data));
          new aos();
      })
      .catch(function (err) {
          console.log(err);
      });
