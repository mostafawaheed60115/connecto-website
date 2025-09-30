document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const response = await fetch("/contact_form", {
    method: "POST",
    body: formData
  });
  
  const result = await response.json();
  if (result.success) {
    alert(result.message);  // or show a nice Bootstrap alert
    this.reset();
  } else {
    alert(result.message);
  }
});
