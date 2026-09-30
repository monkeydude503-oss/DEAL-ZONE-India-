const cats=["All","Electronics","Mobiles & Accessories","Fashion","Home & Kitchen"];
const catEl=document.getElementById("cats");
catEl.innerHTML=cats.map(c=>`<button class="${c==="All"?"active":""}" onclick="loadDeals('${c}')">${c}</button>`).join("");

async function loadDeals(category="All"){
  document.querySelectorAll(".cats button").forEach(b=>b.classList.toggle("active",b.textContent===category));
  const q=document.getElementById("search").value.trim();
  const r=await fetch(`/api/products?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`);
  const items=await r.json();
  document.getElementById("count").textContent=`${items.length} deals`;
  document.getElementById("grid").innerHTML=items.length?items.map(p=>`
  <article class="card">
    <div class="pic"><img src="${p.image}" alt="${p.name}" loading="lazy"><span>-${p.discount}%</span></div>
    <div class="body"><small>${p.category}</small><h3>${p.name}</h3>
    <div class="price">₹${p.price.toLocaleString("en-IN")} <del>₹${p.oldPrice.toLocaleString("en-IN")}</del></div>
    <p class="seller">Available on <b>${p.seller}</b></p>
    <a class="buy" href="/go/${p.id}">Buy on ${p.seller} ↗</a>
    </div>
  </article>`).join(""):`<div class="empty">No deals found. Try another search.</div>`;
}
function searchDeals(){loadDeals(document.querySelector(".cats button.active")?.textContent||"All");}
document.getElementById("search").addEventListener("keydown",e=>{if(e.key==="Enter")searchDeals()});
loadDeals();