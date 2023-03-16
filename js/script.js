async function saveData() {
    const obj = await validateData()
    console.log(obj);
    if (obj) {
        const id = 'EMP' + Math.random().toString(16).slice(2)
        localStorage.setItem(id, JSON.stringify(obj))
        getData('home')
    } else
        return false
}

async function updateData() {
    const obj = await validateData()
    if (obj) {
        console.log(obj);
        const UID = document.getElementById('uid').innerText
        localStorage.setItem(UID, JSON.stringify(obj))
        getData('home')
    } else
        return false
}

async function validateData() {
    let name = document.getElementById("name").value
    let office = document.getElementById("office").value
    let res = document.getElementById("res").value
    let mob1 = document.getElementById("mob1").value
    let tel1 = document.getElementById("tel1").value
    let email = document.getElementById("email").value
    let aadhar = document.getElementById("aadhar").value
    let gstin = document.getElementById("gstin").value
    let veh = document.getElementById("veh").value
    let bank = document.getElementById("bank").value
    let acno = document.getElementById("acno").value
    let dl = document.getElementById("dl").value
    let dcno = document.getElementById("dcno").value
    let ccno = document.getElementById("ccno").value
    let passno = document.getElementById("passno").value
    let panno = document.getElementById("panno").value
    let blood = document.getElementById("blood").value
    let name2 = document.getElementById("name2").value
    let mob2 = document.getElementById("mob2").value
    let tel2 = document.getElementById("tel2").value
    let rel = document.getElementById("rel").value
    let dob = document.getElementById("dob").value
    let image = document.getElementById("file")
    let gender = 'null'
    let imageHash
    let flag = true

    let elements = document.getElementsByClassName("gender")
    elements[0].checked ? gender = "Male" : (elements[1].checked ? gender = "Female" : gender = null)

    let checkedBoxes = getCheckedBoxes();

    if (name == "") {
        document.getElementById("nameEmpty").style.display = 'block'
        flag = false
    }
    if (office == "") {
        document.getElementById("officeEmpty").style.display = 'block'
        flag = false
    }
    if (res == "") {
        document.getElementById("resEmpty").style.display = 'block'
        flag = false
    }
    if (mob1 == "") {
        document.getElementById("mob1Empty").style.display = 'block'
        flag = false
    }
    if (tel1 == "") {
        document.getElementById("tel1Empty").style.display = 'block'
        flag = false
    }
    if (email == "") {
        document.getElementById("emailEmpty").style.display = 'block'
        flag = false
    }
    if (aadhar == "") {
        document.getElementById("aadharEmpty").style.display = 'block'
        flag = false
    }
    if (gstin == "") {
        document.getElementById("gstinEmpty").style.display = 'block'
        flag = false
    }
    if (dob == "") {
        document.getElementById("dobEmpty").style.display = 'block'
        flag = false
    }
    if (veh == "") {
        document.getElementById("vehEmpty").style.display = 'block'
        flag = false
    }
    if (dl == "") {
        document.getElementById("dlEmpty").style.display = 'block'
        flag = false
    }
    if (bank == "") {
        document.getElementById("bankEmpty").style.display = 'block'
        flag = false
    }
    if (acno == "") {
        document.getElementById("acnoEmpty").style.display = 'block'
        flag = false
    }
    if (dcno == "") {
        document.getElementById("dcnoEmpty").style.display = 'block'
        flag = false
    }
    if (ccno == "") {
        document.getElementById("ccnoEmpty").style.display = 'block'
        flag = false
    }
    if (passno == "") {
        document.getElementById("passnoEmpty").style.display = 'block'
        flag = false
    }
    if (panno == "") {
        document.getElementById("pannoEmpty").style.display = 'block'
        flag = false
    }
    if (name2 == "") {
        document.getElementById("name2Empty").style.display = 'block'
        flag = false
    }
    if (mob2 == "") {
        document.getElementById("mob2Empty").style.display = 'block'
        flag = false
    }
    if (tel2 == "") {
        document.getElementById("tel2Empty").style.display = 'block'
        flag = false
    }
    if (rel == "") {
        document.getElementById("relEmpty").style.display = 'block'
        flag = false
    }
    if (!checkedBoxes) {
        document.getElementById("hobbiesEmpty").style.display = 'block'
        flag = false
    }
    if (checkedBoxes != null && checkedBoxes.length <= 1) {
        document.getElementById("hobbiesLess").style.display = 'block'
        flag = false
    }
    if (!gender) {
        document.getElementById("genEmpty").style.display = 'block'
        flag = false
    }
    if (image.files.length < 1) {
        document.getElementById("fileEmpty").style.display = 'block'
        flag = false
    } else {
        document.getElementById("fileEmpty").style.display = 'none'
        imageHash = await fileUpload(image)
    }
    if (flag) {
        const dataObj = {
            hobbies: JSON.stringify(checkedBoxes),
            name: name,
            imageHash: imageHash,
            office: office,
            res: res,
            mob1: mob1,
            tel1: tel1,
            email: email,
            aadhar: aadhar,
            gstin: gstin,
            dob: dob,
            veh: veh,
            bank: bank,
            acno: acno,
            dl: dl,
            dcno: dcno,
            ccno: ccno,
            panno: panno,
            passno: passno,
            blood: blood,
            name2: name2,
            mob2: mob2,
            tel2: tel2,
            rel: rel,
            gender: gender,
        }
        return dataObj
    } else {
        return dataObj = null
    }
}

const getData = function (link, data = null) {
    const html = fetch(link + '.html').then()

    html.then(htmlData => {
        return htmlData.text()
    }
    ).then(final => {
        document.getElementById('response').innerHTML = final
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
                            <td><img src='${data.imageHash}'></td>
                            td>
                                <div class="d-flex align-items-middle flex-column">
                                    <button data-id='${id}' class="mx-2 mb-3 btn btn-primary" onclick='viewEmp(this)'><i class="bi bi-eye"></i></button>
                                    <button data-id='${id}' class="mx-2 mb-3 btn btn-success" onclick='editEmp(this)'><i class="bi bi-pencil-square"></i></button>
                                    <button data-id='${id}' class="mx-2 btn btn-danger" onclick='delEmp(this)'><i class="bi bi-trash"></i></button><
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
                console.log(empData);
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
                document.getElementById("name2").value = empData.name2
                document.getElementById("mob2").value = empData.mob2
                document.getElementById("tel2").value = empData.tel2
                document.getElementById("rel").value = empData.rel
                document.getElementById("image").setAttribute("src", empData.imageHash)

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
        document.getElementById("hobbiesLess").style.display = 'none'
    } else if (count < 2) {
        document.getElementById("hobbiesLess").style.display = 'block'
        document.getElementById("hobbiesEmpty").style.display = 'none'
    } else {
        document.getElementById("hobbiesEmpty").style.display = 'none'
        document.getElementById("hobbiesLess").style.display = 'none'
    }
}

function updateRadio() {
    document.getElementById("genEmpty").style.display = 'none'
}

function validateEmail(input) {
    let value = input.value
    let regex = /[^a-zA-Z0-9@\._ ]/;
    if (value.length > 0)
        document.getElementById("emailEmpty").style.display = 'none'
    else
        document.getElementById("emailEmpty").style.display = 'block'

    if (regex.test(value)) {
        document.getElementById(input.id + "Error").style.display = 'block'
        setTimeout(() => {
            document.getElementById(input.id + "Error").style.display = 'none'
        }, 2000);
        input.value = value.replace(/[^a-zA-Z0-9@\._ ]/g, "")
    } else {
        return true
    }
}

function validateText(input) {
    let value = input.value
    let regex = /[^a-zA-Z0-9 ]/;
    if (value.length > 0)
        document.getElementById(input.id + "Empty").style.display = 'none'
    else
        document.getElementById(input.id + "Empty").style.display = 'block'

    if (regex.test(value)) {
        document.getElementById(input.id + "Error").style.display = 'block'
        setTimeout(() => {
            document.getElementById(input.id + "Error").style.display = 'none'
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
        document.getElementById(input.id + "Error").style.display = 'block'
        setTimeout(() => {
            document.getElementById(input.id + "Error").style.display = 'none'
        }, 2000);
        input.value = value.replace(/[^a-zA-Z0-9/\-,\n\. ]/g, "")
    } else return true;
}