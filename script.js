function processCSV() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a CSV file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const csvContent = event.target.result;
        const rows = csvContent.split('\n').map(row => row.split(','));

        const newRows = rows.map(row => row.filter((_, index) => index !== 6 && index !== 11));
        const newCsvContent = newRows.map(row => row.join(',')).join('\n');

        downloadCSV(newCsvContent);
    };

    reader.readAsText(file);
}

function downloadCSV(content) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = 'output.csv';
    downloadLink.style.display = 'block';
    downloadLink.innerText = 'Download output.csv';
}
