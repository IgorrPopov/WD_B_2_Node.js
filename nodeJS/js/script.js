const selectRequestFormClass = 'request-form';

$(() => {

    $(`.${selectRequestFormClass}`).on('submit', (e) => {

        e.preventDefault();

        const $target = $(e.target);

        $.ajax({
            url: $target.attr('action'),
            method: $target.find('button').attr('value')
        });

    });

});