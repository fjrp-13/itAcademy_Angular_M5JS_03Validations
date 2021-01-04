appConfig = {
    errorFieldSuffix: "Error"
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        // var forms = document.getElementsByClassName('needs-validation');
        var forms = document.forms;
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            // form.addEventListener('blur', (event) => {
            //     console.log("remove invalid - " + event.target.id + 'Error');
            //     event.target.classList.remove('is-invalid');
            //     document.getElementById(event.target.id + 'Error').textContent = '';
            // }, true);
            form.addEventListener('submit', function (event) {
                console.log("submit");
                if (validateForm(form) === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                event.preventDefault();
                event.stopPropagation();
            }, false);
        });
    }, false);

    // Reset Modal Fields
    $('.modal').on('hidden.bs.modal', function (e) {
        $(this)
            .find(".is-invalid")
            .removeClass("is-invalid")
            .end()
            .find("input,textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
    })
})();

const resetClassInFormFields = function (form, className) {
    let fields = form.getElementsByClassName(className);
    // El objeto "fields" es un "array vivo" y reflejará todos los cambios/actualizaciones del DOM, 
    // por lo que se irá "actualizando" al quitar la clase a sus elementos
    while (fields.length > 0) {
        fields[0].classList.remove(className);
    }
}; // resetClassInFormFields

const validateEmail = function (email) {
    // https://regexr.com/3e48o
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email) ? true : false;
}; // validateEmail


const checkPwdStrength = function (password) {
    if (password.length == 0) {
        return false;
    }

    const MIN_PWD_LENGTH = 8;
    const MIN_PWD_PASSED = 3;
    let passed = 0;

    // Regular Expressions
    let regex = new Array();
    regex.push("[A-Z]"); // For Uppercase Alphabet
    // regex.push("[a-z]"); // For Lowercase Alphabet
    regex.push("[0-9]"); // For Numeric Digits
    // regex.push("[$@$!%*#?&]"); // For Special Characters

    //Validation for each Regular Expression
    for (var i = 0; i < regex.length; i++) {
        if (new RegExp(regex[i]).test(password)) {
            passed++;
        }
    }

    //Validation for Length of Password
    if (password.length >= MIN_PWD_LENGTH) {
        passed++;
    }

    return (passed >= MIN_PWD_PASSED);
}; // checkPwdStrength

const validateLoginForm = function (form) {
    let errorFound = false;
    let validationObj = {
        email: { id: "loginEmail", msgErrorReq: "Email obligatorio", msgErrorFormato: "Formato de email incorrecto." },
        pwd: { id: "loginPwd", msgErrorReq: "Pasword obligatorio" }
    };

    // Campos a validar
    let emailField = form[validationObj.email.id];
    let pwdField = form[validationObj.pwd.id];

    // Validar loginEmail
    if (emailField.value.trim().length == 0) {
        errorFound = true;
        setInvalidField(emailField, validationObj.email.msgErrorReq);
    } else if (!validateEmail(emailField.value.trim())) {
        errorFound = true;
        setInvalidField(emailField, validationObj.email.msgErrorFormato);
    }

    // Validar loginPwd
    if (pwdField.value.trim().length == 0) {
        errorFound = true;
        setInvalidField(pwdField, validationObj.pwd.msgErrorReq);
    }

    return !errorFound;
}; // validateLoginForm

const setInvalidField = function (field, errorMsg) {
    field.classList.add("is-invalid");
    document.getElementById(field.id + appConfig.errorFieldSuffix).textContent = errorMsg;
}
const validateSignupForm = function (form) {
    let errorFound = false;
    let validationObj = {
        email: { id: "signupEmail", msgErrorReq: "Email obligatorio", msgErrorFormato: "Formato de email incorrecto." },
        nombre: { id: "signupNombre", msgErrorReq: "Nombre obligatorio" },
        // apellidos: { id: "signupApellido", msgErrorReq: "Apellidos obligatorio" },
        provincia: { id: "signupProvincia", msgErrorReq: "Provincia obligatoria" },
        pwd: { id: "signupPwd", msgErrorReq: "Contraseña obligatoria", msgErrorFormato: "Formato incorrecto" },
        pwdRepeat: { id: "signupPwdRepeat", msgErrorReq: "Repetición de la contraseña obligatoria", msgErrorFormato: "Las contraseñas no coinciden" },
        cbPolitica: { id: "signupCheckPolitica", msgErrorReq: "Debe aceptar la política de privacidad" }
    };

    // Campos a validar
    let emailField = form[validationObj.email.id];
    let nombreField = form[validationObj.nombre.id];
    // let apellidosField = form[validationObj.apellidos.id];
    let provinciaField = form[validationObj.provincia.id];
    let pwdField = form[validationObj.pwd.id];
    let pwdRepeatField = form[validationObj.pwdRepeat.id];
    let cbPoliticaField = form[validationObj.cbPolitica.id];

    // Validar Email
    if (emailField.value.trim().length == 0) {
        errorFound = true;
        setInvalidField(emailField, validationObj.email.msgErrorReq);
    } else if (!validateEmail(emailField.value.trim())) {
        errorFound = true;
        setInvalidField(emailField, validationObj.email.msgErrorFormato);
    }

    // Validar Nombre
    if (nombreField.value.trim().length == 0) {
        errorFound = true;
        setInvalidField(nombreField, validationObj.nombre.msgErrorReq);
    }

    // Validar Apellidos
    // if (apellidosField.value.trim().length == 0) {
    //     errorFound = true;
    //     setInvalidField(apellidosField, validationObj.apellidos.msgErrorReq);
    // }

    // Validar Provincia
    if (provinciaField.value.trim().length == 0) {
        errorFound = true;
        setInvalidField(provinciaField, validationObj.provincia.msgErrorReq);
    }

    // Validar Pwd
    if (pwdField.value.length == 0) {
        errorFound = true;
        setInvalidField(pwdField, validationObj.pwd.msgErrorReq);
    } else if (!checkPwdStrength(pwdField.value)) {
        errorFound = true;
        setInvalidField(pwdField, validationObj.pwd.msgErrorFormato);
    }

    // Validar Pwd Repeat
    if (pwdRepeatField.value.length == 0) {
        errorFound = true;
        setInvalidField(pwdRepeatField, validationObj.pwdRepeat.msgErrorReq);
    } else if (pwdField.value != pwdRepeatField.value) {
        errorFound = true;
        setInvalidField(pwdRepeatField, validationObj.pwdRepeat.msgErrorFormato);
    }

    // Validar Checkbox Política
    if (!cbPoliticaField.checked) {
        errorFound = true;
        setInvalidField(cbPoliticaField, validationObj.cbPolitica.msgErrorReq);
    }

    return !errorFound;
}; // validateSignupForm

const validateSearchForm = function (form) {
    let errorFound = false;
    // const ERROR_FIELD_SUFFIX = "Error";
    let validationObj = {
        keyword: { id: "searchKeyword", msgErrorReq: "Debe especificar alguno de los datos para la búsqueda", msgErrorLength: "Debe indicar más de 3 carácteres." },
        isbn: { id: "searchISBN", msgErrorReq: "Debe especificar alguno de los datos para la búsqueda", msgErrorLength: "Debe indicar más de 3 carácteres." },
        titulo: { id: "searchTitulo", msgErrorReq: "Debe especificar alguno de los datos para la búsqueda", msgErrorLength: "Debe indicar más de 3 carácteres." },
        autor: { id: "searchAutor", msgErrorReq: "Debe especificar alguno de los datos para la búsqueda", msgErrorLength: "Debe indicar más de 3 carácteres." },
    };

    // Campos a validar
    let keywordField = form[validationObj.keyword.id];
    let isbnField = form[validationObj.isbn.id];
    let tituloField = form[validationObj.titulo.id];
    let autorField = form[validationObj.autor.id];

    // Validar Required Fields
    if (keywordField.value.trim().length + isbnField.value.trim().length + tituloField.value.trim().length + autorField.value.trim().length == 0) {
        errorFound = true;
        setInvalidField(keywordField, validationObj.keyword.msgErrorReq);
        setInvalidField(isbnField, validationObj.isbn.msgErrorReq);
        setInvalidField(tituloField, validationObj.titulo.msgErrorReq);
        setInvalidField(autorField, validationObj.autor.msgErrorReq);
    }
    // Validar searchKeyword
    if (keywordField.value.trim().length < 4 && keywordField.value.trim().length > 0) {
        errorFound = true;
        setInvalidField(keywordField, validationObj.keyword.msgErrorLength);
    }
    // Validar searchISBN
    if (isbnField.value.trim().length < 4 && isbnField.value.trim().length > 0) {
        errorFound = true;
        setInvalidField(isbnField, validationObj.isbn.msgErrorLength);
    }
    // Validar searchTitulo
    if (tituloField.value.trim().length < 4 && tituloField.value.trim().length > 0) {
        errorFound = true;
        setInvalidField(tituloField, validationObj.titulo.msgErrorLength);
    }
    // Validar searchAutor
    if (autorField.value.trim().length < 4 && autorField.value.trim().length > 0) {
        errorFound = true;
        setInvalidField(autorField, validationObj.autor.msgErrorLength);
    }

    return !errorFound;

}; // validateSearchForm

const validateForm = function (form) {
    let isValid = false;
    resetClassInFormFields(form, 'is-invalid');
    switch (form.id) {
        case 'searchForm':
            isValid = validateSearchForm(form);
            break;
        case 'loginForm':
            isValid = validateLoginForm(form);
            break;
        case 'signupForm':
            isValid = validateSignupForm(form);
            break;
        default:
            isValid = false;
    }

    return isValid;
}; // validateForm
