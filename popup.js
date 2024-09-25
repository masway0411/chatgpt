document.getElementById('getData').addEventListener('click', function() {
    const sheetUrl = document.getElementById('sheetUrl').value;
    if (sheetUrl) {
        fetchGoogleSheetData(sheetUrl);
    }
});

document.getElementById('askGPT').addEventListener('click', function() {
    const userPrompt = document.getElementById('userPrompt').value;
    if (userPrompt) {
        askChatGPT(userPrompt);
    }
});

// Fungsi untuk mengambil data dari Google Sheets
function fetchGoogleSheetData(sheetUrl) {
    const url = `${sheetUrl}/gviz/tq?tqx=out:json`; // Menggunakan query untuk mendapatkan JSON dari Sheet
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const json = JSON.parse(data.substr(47).slice(0, -2)); // Parsing Google Sheets JSONP
            console.log(json);
            alert("Data from sheet: " + JSON.stringify(json.table.rows)); // Tampilan data mentah
        })
        .catch(error => {
            console.error("Error fetching sheet data: ", error);
        });
}

// Fungsi untuk berinteraksi dengan ChatGPT tanpa API resmi (secara manual atau scraping)
function askChatGPT(prompt) {
    const url = "https://chat.openai.com/chat"; // Menggunakan akses langsung ke halaman ChatGPT

    // Simulasi user untuk mengirim pertanyaan ke ChatGPT
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": prompt
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.choices[0].text;
    })
    .catch(error => {
        console.error("Error interacting with ChatGPT: ", error);
    });
}
