//  To save employee data in the Local Storage
async function saveData() {
    const obj = await validateData()
    if (obj) {
        const id = 'EMP' + Math.random().toString(16).slice(2)
        localStorage.setItem(id, JSON.stringify(obj))
        getData('home')
    } else
        return false
}

//  TO update employee data in the Local Storage
async function updateData() {
    const obj = await validateData()
    if (obj) {
        const UID = document.getElementById('uid').innerText
        localStorage.setItem(UID, JSON.stringify(obj))
        getData('home')
    } else
        return false
}

//  To validate all the input fields and show error if needed
async function validateData() {
    const allInputs = {
        name: document.getElementById("name").value,
        office: document.getElementById("office").value,
        res: document.getElementById("res").value,
        mob1: document.getElementById("mob1").value,
        tel1: document.getElementById("tel1").value,
        email: document.getElementById("email").value,
        aadhar: document.getElementById("aadhar").value,
        gstin: document.getElementById("gstin").value,
        veh: document.getElementById("veh").value,
        bank: document.getElementById("bank").value,
        acno: document.getElementById("acno").value,
        dl: document.getElementById("dl").value,
        dcno: document.getElementById("dcno").value,
        ccno: document.getElementById("ccno").value,
        passno: document.getElementById("passno").value,
        panno: document.getElementById("panno").value,
        blood: document.getElementById("blood").value,
        secondName: document.getElementById("secondName").value,
        mob2: document.getElementById("mob2").value,
        tel2: document.getElementById("tel2").value,
        rel: document.getElementById("rel").value,
        dob: document.getElementById("dob").value,
        gender: '',
        file: '',
        hobbies: ''
    }
    let flag = true

    // To get the checked value of gender
    let elements = document.getElementsByClassName("gender")
    elements[0].checked ? allInputs.gender = "Male" : (elements[1].checked ? allInputs.gender = "Female" : allInputs.gender = null)

    // To get all the checked hobbies
    let checkedBoxes = getCheckedBoxes();
    if (!checkedBoxes) {
        document.getElementById("hobbiesEmpty").style.display = 'block'
        flag = false
    } else allInputs.hobbies = JSON.stringify(checkedBoxes)

    // To check if file is uploaded
    let image = document.getElementById("file")
    if (image.files.length < 1) {
        document.getElementById("fileEmpty").style.display = 'block'
        flag = false
    } else {
        document.getElementById("fileEmpty").style.display = 'none'
        // This will generate Base64 string for given image 
        allInputs.file = await fileUpload(image)
    }

    // Checking and enabling error message for missing field values
    for (const inputI in allInputs) {
        if (allInputs[inputI] == "") {
            document.getElementById(inputI + "Empty").style.display = 'block'
            flag = false
        }
    }
    if (flag) {
        return dataObj = allInputs
    } else {
        return dataObj = null
    }
}

//  To get the requested HTML page using fetch API
const getData = function (link, data = null) {
    const html = fetch('./htmlPages/' + link + '.html').then()

    html.then(htmlData => {
        // Convert the data to plain text string
        return htmlData.text()
    }
    ).then(final => {
        // Change the data in index file
        document.getElementById('response').innerHTML = final

        // Handle different cases of requested page
        switch (link) {
            case 'home':
                const allForms = { ...localStorage }
                if (Object.keys(allForms).length) {
                    let sr = 1
                    for (const id in allForms) {
                        if (!(id.startsWith('EMP')))
                            continue;
                        const data = JSON.parse(allForms[id])
                        const tr = `
                        <tr class='bg-light'>
                            <td>${sr}</td>
                            <td>${id}</td>
                            <td>${data.name}</td>
                            <td>${data.email}</td>
                            <td>${data.mob1}</td>
                            <td><img src='${data.file}'></td>
                            <td>
                                <div class="d-flex align-items-middle flex-column">
                                    <button data-id='${id}' class="mx-2 mb-3 btn btn-primary" onclick='viewEmp(this)'><i class="bi bi-eye"></i></button>
                                    <button data-id='${id}' class="mx-2 mb-3 btn btn-success" onclick='editEmp(this)'><i class="bi bi-pencil-square"></i></button>
                                    <button data-id='${id}' class="mx-2 btn btn-danger" onclick='delEmp(this)'><i class="bi bi-trash"></i></button>
                                </div>
                            </td>
                        </tr>`
                        sr++
                        document.getElementById('empData').innerHTML += tr
                    }
                } else {
                    const tr = `
                    <tr>
                    <td colspan='7' class='text-danger h5'> --- No Data Available ---</td>
                    </tr>`
                    document.getElementById('empData').innerHTML += tr
                }
                document.getElementsByClassName('home')[0].classList.add('active')
                document.getElementsByClassName('add')[0].classList.remove('active')
                break;

            case 'editData':
            case 'viewData':
                let empData = JSON.parse(localStorage.getItem(data.dataset.id))
                // Fill the html form with the inputs
                document.getElementById('uid').innerText = data.dataset.id
                document.getElementById("name").value = empData.name
                document.getElementById("office").value = empData.office
                document.getElementById("res").value = empData.res
                document.getElementById("mob1").value = empData.mob1
                document.getElementById("tel1").value = empData.tel1
                document.getElementById("email").value = empData.email
                document.getElementById("aadhar").value = empData.aadhar
                document.getElementById("gstin").value = empData.gstin
                document.getElementById("dob").value = empData.dob
                document.getElementById("veh").value = empData.veh
                document.getElementById("bank").value = empData.bank
                document.getElementById("acno").value = empData.acno
                document.getElementById("dl").value = empData.dl
                document.getElementById("dcno").value = empData.dcno
                document.getElementById("ccno").value = empData.ccno
                document.getElementById("passno").value = empData.passno
                document.getElementById("panno").value = empData.panno
                document.getElementById("blood").value = empData.blood
                document.getElementById("secondName").value = empData.secondName
                document.getElementById("mob2").value = empData.mob2
                document.getElementById("tel2").value = empData.tel2
                document.getElementById("rel").value = empData.rel
                document.getElementById("image").setAttribute("src", empData.file)

                let hobbies = JSON.parse(empData.hobbies)
                hobbies.forEach(element => {
                    document.getElementById(element).checked = true
                });

                gender = empData.gender
                if (gender == "Male")
                    document.getElementById("male").checked = true
                else if (gender == "Female")
                    document.getElementById("female").checked = true
                break;

            case 'addData':
                document.getElementsByClassName('add')[0].classList.add('active')
                document.getElementsByClassName('home')[0].classList.remove('active')
                break;
        }
    })
}

window.onload = getData('home')

function viewEmp(element) {
    getData('viewData', element)
}

function editEmp(element) {
    getData('editData', element)
}

function delEmp(element) {
    let flag = confirm("Are you sure you want to delete this Employee data?")
    if (flag == 1) {
        localStorage.removeItem(element.dataset.id)
        getData('home')
    }
}

function getCheckedBoxes() {
    let checkboxes = document.getElementsByName("hobbies")
    let checkboxesChecked = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

function updateCheckbox() {
    let count = getCheckedBoxes()
    count == null ? count = 0 : count = count.length
    if (count == 0) {
        document.getElementById("hobbiesEmpty").style.display = 'block'
    } else if (count < 2) {
        document.getElementById("hobbiesEmpty").style.display = 'block'
        document.getElementById("hobbiesEmpty").innerText = 'Please select at least 2 hobbies'
    } else
        document.getElementById("hobbiesEmpty").style.display = 'none'
}

function updateRadio() {
    document.getElementById("genderEmpty").style.display = 'none'
}

function validateEmail(input) {
    let value = input.value
    let regex = /[^a-zA-Z0-9@\._ ]/;
    if (value.length > 0)
        document.getElementById("emailEmpty").style.display = 'none'
    else
        document.getElementById("emailEmpty").style.display = 'block'

    if (regex.test(value)) {
        document.getElementById(input.id + "Empty").style.display = 'block'
        document.getElementById(input.id + "Empty").innerText = 'Special characters are not allowed!'
        setTimeout(() => {
            document.getElementById(input.id + "Empty").innerText = `Please enter a ${input.id}`
            document.getElementById(input.id + "Empty").style.display = 'none'
        }, 2000);
        input.value = value.replace(/[^a-zA-Z0-9@\._ ]/g, "")
    } else return true;
}

function validateText(input) {
    let value = input.value
    let regex = /[^a-zA-Z0-9 ]/;
    if (value.length > 0)
        document.getElementById(input.id + "Empty").style.display = 'none'
    else
        document.getElementById(input.id + "Empty").style.display = 'block'

    if (regex.test(value)) {
        document.getElementById(input.id + "Empty").style.display = 'block'
        document.getElementById(input.id + "Empty").innerText = 'Special characters are not allowed!'
        setTimeout(() => {
            document.getElementById(input.id + "Empty").innerText = `Please enter a ${input.id}`
            document.getElementById(input.id + "Empty").style.display = 'none'
        }, 2000);
        input.value = value.replace(/[^a-zA-Z0-9 ]/g, "")
    } else return true;
}

function validateNumber(input) {
    let value = input.value
    let regex = /[^0-9 ]/
    if (value.length > 0)
        document.getElementById(input.id + "Empty").style.display = 'none'
    else
        document.getElementById(input.id + "Empty").style.display = 'block'

    if (regex.test(value)) {
        input.value = value.replace(/[^0-9 ]/g, "")
    } else return true;
}

function fileUpload(element) {
    const fileProm = new Promise((resolve, reject) => {
        let file = element.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            resolve(reader.result)
        }
        reader.error = () => {
            reject('File can\'t be read')
        }
    })
    return fileProm
}

function validateAddress(input) {
    let value = input.value
    let regex = /[^a-zA-Z0-9/\-,\n\. ]/;
    if (value.length > 0)
        document.getElementById(input.id + "Empty").style.display = 'none'
    else
        document.getElementById(input.id + "Empty").style.display = 'block'

    if (regex.test(value)) {
        document.getElementById(input.id + "Empty").style.display = 'block'
        document.getElementById(input.id + "Empty").innerText = 'Special characters are not allowed!'
        setTimeout(() => {
            document.getElementById(input.id + "Empty").innerText = `Please enter address`
            document.getElementById(input.id + "Empty").style.display = 'none'
        }, 2000);
        input.value = value.replace(/[^a-zA-Z0-9/\-,\n\. ]/g, "")
    } else return true;
}