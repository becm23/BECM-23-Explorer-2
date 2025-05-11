import Fuse from 'fuse.js';
fetch('studyMaterials.json')
  .then(response => response.json())
  .then(data => {
    const fuse = new Fuse(data, {
      keys: ['subject', 'materials.title', 'materials.url'],
      includeScore: true,
      threshold: 0.3, 
    });
    function search(query) {
      const results = fuse.search(query);
      displayResults(results);
    }
    function displayResults(results) {
      const resultContainer = document.getElementById('resultContainer');
      resultContainer.innerHTML = ''; 

      results.forEach(result => {
        const item = result.item;
        item.materials.forEach(material => {
          const link = document.createElement('a');
          link.href = material.url;
          link.target = '_blank'; 
          link.innerText = `${material.title} (${material.type})`;
          resultContainer.appendChild(link);
          resultContainer.appendChild(document.createElement('br'));
        });
      });
    }
    document.getElementById('searchInput').addEventListener('input', (event) => {
      search(event.target.value);
    });
  });
