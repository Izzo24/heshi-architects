/* 合石建築師事務所 — interactions */
(function(){
  "use strict";

  /* ---- mobile drawer ---- */
  var burger = document.querySelector(".burger");
  var drawer = document.getElementById("drawer");
  if(burger && drawer){
    var toggle = function(open){
      burger.setAttribute("aria-expanded", open ? "true":"false");
      drawer.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden":"";
    };
    burger.addEventListener("click", function(){
      toggle(burger.getAttribute("aria-expanded")!=="true");
    });
    drawer.addEventListener("click", function(e){
      if(e.target.tagName==="A") toggle(false);
    });
    document.addEventListener("keydown", function(e){
      if(e.key==="Escape" && drawer.classList.contains("open")) toggle(false);
    });
  }

  /* ---- back to top ---- */
  var toTop = document.querySelector(".to-top");
  if(toTop){
    var onScroll = function(){
      if(window.scrollY > window.innerHeight) toTop.classList.add("show");
      else toTop.classList.remove("show");
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
    toTop.addEventListener("click", function(){
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if(reveals.length && "IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, {threshold:.12, rootMargin:"0px 0px -8% 0px"});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add("in"); });
  }

  /* ---- project filter ---- */
  var filters = document.querySelector("[data-filters]");
  if(filters){
    var items = document.querySelectorAll("[data-cat]");
    filters.addEventListener("click", function(e){
      var b = e.target.closest("button"); if(!b) return;
      filters.querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed","false"); });
      b.setAttribute("aria-pressed","true");
      var f = b.getAttribute("data-filter");
      items.forEach(function(it){
        var show = (f==="all" || it.getAttribute("data-cat")===f);
        it.style.display = show ? "" : "none";
      });
    });
  }

  /* ---- contact / subscribe forms -> toast ---- */
  var toast = document.getElementById("toast");
  var showToast = function(msg){
    if(!toast) return;
    toast.querySelector(".tmsg").textContent = msg;
    toast.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function(){ toast.classList.remove("show"); }, 4200);
  };
  document.querySelectorAll("form[data-toast]").forEach(function(f){
    f.addEventListener("submit", function(e){
      e.preventDefault();
      showToast(f.getAttribute("data-toast") || "已送出,我們會盡快與您聯繫。");
      f.reset();
    });
  });

  /* ---- footer year ---- */
  var y = document.getElementById("yr");
  if(y) y.textContent = new Date().getFullYear();
})();
