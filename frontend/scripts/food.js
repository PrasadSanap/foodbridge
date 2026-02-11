document.getElementById('foodForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData.entries());

  const res = await fetch('/api/food/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('token')
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  alert(data.message);
});

async function loadFood() {
  const res = await fetch('/api/food/available', {
    headers: { 'authorization': localStorage.getItem('token') }
  });
  const items = await res.json();
  document.getElementById('availableFood').innerHTML =
    items.map(i => `<p>${i.itemName} - ${i.quantity}</p>`).join('');
}
loadFood();