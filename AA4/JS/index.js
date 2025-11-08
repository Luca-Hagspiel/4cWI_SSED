$('#formData').parsley();

window.Parsley.addValidator('filemaxsize', {
    requirementType: 'integer',
    validateString: (value, maxSize, el) => {
        const files = el.$element[0].files;
        if (!files.length) return true;
        return files[0].size / 1024 / 1024 <= maxSize;
    },
    messages: { de: 'Datei zu groß (max. %s MB).' }
});

$('#formData').on('submit', function(e) {
    e.preventDefault();
    if ($(this).parsley().isValid()) {
        $('#result').text('Validierung erfolgreich');
    }
});

