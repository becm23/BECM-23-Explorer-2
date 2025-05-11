fetch('studyMaterials.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Check if data is loading correctly
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
      resultContainer.innerHTML = ''; // Clear previous results

      results.forEach(result => {
        const item = result.item;
        item.materials.forEach(material => {
          const link = document.createElement('a');
          link.href = material.url;
          link.target = '_blank'; // Open in new tab
          link.innerText = `${material.title} (${material.type})`;
          resultContainer.appendChild(link);
          resultContainer.appendChild(document.createElement('br'));
        });
      });
    }

    document.getElementById('searchInput').addEventListener('input', (event) => {
      search(event.target.value);
    });
  })
  .catch(err => console.error('Error loading the JSON file:', err));
