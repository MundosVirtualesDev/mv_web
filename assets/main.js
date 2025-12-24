(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    // Scroll reveal
    const revealEls=[...document.querySelectorAll('.card, .project-card, .section, .hero, .footer, .clients-grid > *, .kpi, .feature')];
    revealEls.forEach(el=>el.classList.add('reveal'));
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target);} });
    }, {threshold:0.12, rootMargin:'0px 0px -10% 0px'});
    revealEls.forEach(el=>io.observe(el));

  function setActiveNav(){
    const path=(location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const links=[...document.querySelectorAll('.navlinks a, .mobile-menu a')];
    links.forEach(a=>{
      const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
      const isMatch = href && (href===path);
      a.classList.toggle('active', isMatch);
      if(isMatch){ a.setAttribute('aria-current','page'); }
      else{ a.removeAttribute('aria-current'); }
    });
  }

  const root=document.documentElement;
  const saved=localStorage.getItem("mv_theme");
  const systemDark=window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function apply(theme){
    root.setAttribute("data-theme", theme);
    localStorage.setItem("mv_theme", theme);
    const sun=document.getElementById("iconSun");
    const moon=document.getElementById("iconMoon");
    if(sun && moon){
      const isDark=theme==="dark";
      sun.style.display=isDark?"none":"block";
      moon.style.display=isDark?"block":"none";
    }
  }

  apply(saved ? saved : (systemDark ? "dark" : "light"));


  
  
  // Mobile menu (slide-down)
  const mBtn = document.getElementById("mobileMenuBtn");
  const m = document.getElementById("mobileMenu");
  function closeMenu(){
    if(m){ m.classList.remove("is-open"); }
  }
  function toggleMenu(){
    if(!m) return;
    m.classList.toggle("is-open");
  }
  if(mBtn && m){
    mBtn.addEventListener("click", toggleMenu);
    m.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", closeMenu);
    });
    window.addEventListener("resize", ()=>{ if(window.innerWidth>960) closeMenu(); });
    document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeMenu(); });
  }

  setActiveNav();



  

  function setupStickyCta(){
    const bar=document.querySelector(".mobile-cta");
    if(!bar) return;
    const a=bar.querySelector("a.btn");
    if(!a) return;
    const page=(location.pathname.split("/").pop() || "index.html").toLowerCase();
    if(page==="automatizacion.html"){
      a.href="automatizacion.html#contacto";
      a.textContent="Cotizar Automatización";
    }else if(page==="gestion-efectivo.html"){
      a.href="gestion-efectivo.html#contacto";
      a.textContent="Cotizar Gestión del Efectivo";
    }else{
      a.href="index.html#contacto";
      a.textContent="Cotizar";
    }
  }

  

  });
})();


    async function loadProjects(){
      const holder = document.getElementById("projectsHolder");
      if(!holder) return;

      const filterBtns=[...document.querySelectorAll("[data-filter]")];
      let current="all";

      const setActiveBtn=()=>{
        filterBtns.forEach(b=>{
          const on=(b.getAttribute("data-filter")||"")===current;
          b.style.opacity = on ? "1" : ".78";
          b.style.transform = on ? "translateY(-1px)" : "none";
        });
      };

      function render(data){
        holder.innerHTML="";
        const items = current==="all" ? data : data.filter(p=>String(p.category||"").toLowerCase()===current.toLowerCase());
        if(items.length===0){
          holder.innerHTML='<div class="small">No hay proyectos para este filtro (dummy).</div>';
          return;
        }
        items.forEach(p=>{
          const card=document.createElement("article");
          card.className="project-card";
          const img = p.image ? `<img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;display:block" loading="lazy"/>` : "";
          card.innerHTML = `
            <div class="thumb">${img || '<div class="slide-visual" style="height:100%"></div>'}</div>
            <div class="body">
              <h3>${p.title}</h3>
              <p>${p.summary || ""}</p>
              <div class="tagrow">
                ${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}
              </div>
            </div>
          `;
          holder.appendChild(card);
        });
      }

      function bind(data){
        filterBtns.forEach(b=>{
          b.addEventListener("click", ()=>{
            current=b.getAttribute("data-filter")||"all";
            setActiveBtn();
            render(data);
          });
        });
        setActiveBtn();
        render(data);
      }

      // 1) Try embedded JSON first (works on file://)
      const embedded = document.getElementById("projectsData");
      if(embedded){
        try{
          const data = JSON.parse(embedded.textContent || "[]");
          bind(data);
          return;
        }catch(e){ /* fallback to fetch */ }
      }

      // 2) Fallback to fetch (works when served via http)
      try{
        const res = await fetch("projects.json", { cache:"no-store" });
        if(!res.ok) throw new Error("No se pudo cargar projects.json");
        const data = await res.json();
        bind(data);
      }catch(err){
        holder.innerHTML = `<div class="small">No se pudo cargar el listado de proyectos. (${err.message})</div>`;
      }
    }

    const tBtn = document.getElementById("themeToggle");
    if(tBtn){
      tBtn.addEventListener("click", ()=>{
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current==="dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("mv_theme", next);
      });
    }
