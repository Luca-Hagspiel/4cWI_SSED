$('#formData').parsley();

window.Parsley.addValidator('filemaxsize', {
    requirementType: 'integer',
    validateString: (value, maxSize, el) => {
        const files = el.$element[0].files;
        if (!files.length) return true;
        return files[0].size / 1024 / 1024 <= maxSize;
    },
    messages: { en: 'Datei zu groß (max. %s MB).' }
});

window.Parsley.addValidator('filetype', {
    requirementType: 'string', // Liste erlaubter Endungen
    validateString: function(value, allowedTypes, parsleyInstance) {
        const files = parsleyInstance.$element[0].files; // ausgewählte Dateien
        if (!files.length) return true; // keine Datei → ok

        const fileName = files[0].name.toLowerCase(); // Dateiname in Kleinbuchstaben
        const allowedExtensions = allowedTypes.split(',').map(ext => ext.trim().toLowerCase());

        // Prüfen, ob Datei-Endung erlaubt ist
        return allowedExtensions.some(ext => fileName.endsWith(ext));
    },
    messages: {
        en: 'Ungültiger Dateityp. Nur diese Endungen erlaubt: %s',
    }
});


$('#formData').on('submit', function(e) {
    e.preventDefault();
    if ($(this).parsley().isValid()) {
        $('#result').text('Validierung erfolgreich');
    }
});

