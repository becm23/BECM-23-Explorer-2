import Fuse from 'fuse.js';

// Load your study materials JSON file
fetch('studyMaterials.json')
  .then(response => response.json())
  .then(data => {
    // Initialize Fuse.js
    const fuse = new Fuse(data, {
      keys: ['subject', 'materials.title', 'materials.url'],
      includeScore: true,
      threshold: 0.3, // Adjust based on search sensitivity
    });

    // Create a function to handle search queries
    function search(query) {
      const results = fuse.search(query);
      displayResults(results);
    }

    // Function to display results
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

    // Attach event listener to search input
    document.getElementById('searchInput').addEventListener('input', (event) => {
      search(event.target.value);
    });
  });
