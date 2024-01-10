document.querySelectorAll(".userRemove")
  .forEach(btn=>[
    btn.addEventListener("submit",()=>{
      document.getElementById("removeInput").value = btn.id;
      document.getElementById("removeForm").submit();
    })
  ]);