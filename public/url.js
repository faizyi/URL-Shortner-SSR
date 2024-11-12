async function deleteShortId(id){
    await fetch(`/url/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
    alert('URL deleted successfully');
    window.location.reload()
}