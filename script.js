document.querySelector('form').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the search term from the input field
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase();

    // Get the selected file from the dropdown menu
    const selectedFile = document.getElementById('fileSelect').value;

    // Get the exact match checkbox state
    const exactMatch = document.getElementById('exactMatch').checked;

    // Read the content of the selected file
    fetch(selectedFile)
        .then(response => response.text())
        .then(text => {
            // Split the text into an array of words
            const words = text.split('\n');

            // Filter out words based on exact or partial matching
            let matchedWords;
            if (exactMatch) {
                matchedWords = words.filter(word => word.toLowerCase() === searchTerm);
            } else {
                matchedWords = words.filter(word => word.toLowerCase().includes(searchTerm));
            }

            // Count the total number of words in the file
            const totalWordsCount = words.length;

            // Count the number of matched words
            const matchedWordsCount = matchedWords.length;

            // Create a string to hold the HTML content
            let html = `<p class="matched-words">Number of matched words: ${matchedWordsCount}/${totalWordsCount}</p>`;
            html += `<p </p><ul>`;
            
            // Loop through the matched words and add them to the HTML content
            matchedWords.forEach(word => {
                // Colorize the matched letters within the word
                const coloredWord = word.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
                html += `<li>${coloredWord}</li>`;
            });
            html += '</ul>';

            // Display the matched words and count inside the info-panel
            document.querySelector('.info-panel').innerHTML = html;
        });
});
