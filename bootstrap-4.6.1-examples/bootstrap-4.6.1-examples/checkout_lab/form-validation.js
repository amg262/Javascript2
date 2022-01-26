// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';

    $('.btnNext').click(function () {
        $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
    });

    $('.btnPrevious').click(function () {
        $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
    });

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

// $(document).ready(function () {
//     $('.btnNext').click(function () {
//         $('.nav-tabs .active').parent().next('li').trigger('click');
//     });
//
//     $('.btnPrevious').click(function () {
//         $('.nav-tabs .active').parent().prev('li').trigger('click');
//     });
// });