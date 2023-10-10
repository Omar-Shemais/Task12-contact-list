let addContactBtn = document.querySelector('.addContact')
let closeOverlayBtn = document.querySelector('.overlayAdd .close')
let formSection = document.querySelector('.form')
let overlayAdd = document.querySelector('.overlayAdd')
addContactBtn.addEventListener('click', () => {
    formSection.classList.add("overlay")
    overlayAdd.style.display = 'block'
})
closeOverlayBtn.addEventListener('click', () => {
    formSection.classList.remove("overlay")
    overlayAdd.style.display = 'none'
});
let dataSaved = localStorage.getItem("contact")
let contactList = JSON.parse(dataSaved ||"[]")


let LastFormId = contactList.length
let formName = document.getElementById('formName')
let formPhone = document.getElementById('formPhone')
let formEmail = document.getElementById('formEmail')
let formAddress = document.getElementById('formAddress')
let newContact = () => {
    contactList.push({
        contactId: LastFormId += 1,
        contactName: formName.value,
        contactPhone: formPhone.value,
        contactEmail: formEmail.value,
        contactAddress: formAddress.value,
    })
}
let saveBtn = document.querySelector('.saveBtn')
let formTbody = document.querySelector('.tbody')
let renderForm = () => {
    let tr = ''
    contactList.forEach(contact => {
        tr += `
        <tr data-id = ${contact.contactId}>
                    <td>${contact.contactId}</td>
                    <td>${contact.contactName}</td>
                    <td>${contact.contactPhone}</td>
                    <td>${contact.contactEmail}</td>
                    <td>${contact.contactAddress}</td>
                    <td class = "edit">Edit</td>
                    <td class = "delete">Delete</td>
        </tr>
        `
    });
    formTbody.innerHTML = tr
}
let resetForm = () => {
    formName.value = ''
    formPhone.value = ''
    formEmail.value = ''
    formAddress.value = ''
}
let saveBtnFunction = () => {
    newContact()
    localStorage.setItem("contact",JSON.stringify(contactList));
    resetForm()
    renderForm()
    formSection.classList.remove("overlay")
    overlayAdd.style.display = 'none'
}
saveBtn.addEventListener('click', saveBtnFunction)

formTbody.addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        let tr = e.target.parentElement;
        let id = tr.dataset.id;
        let index = id - 1
        formName.value = contactList[index].contactName;
        formPhone.value = contactList[index].contactPhone;
        formEmail.value = contactList[index].contactEmail;
        formAddress.value = contactList[index].contactAddress;
        formSection.classList.add("overlay")
        overlayAdd.style.display = 'block'
        let uptatedFunction = () => {
            let updatedForm = {
                contactId: parseInt(id),
                contactName: formName.value,
                contactPhone: formPhone.value,
                contactEmail: formEmail.value,
                contactAddress: formAddress.value,
            }
            contactList[index] = updatedForm;
            localStorage.setItem("contact", JSON.stringify(contactList));
            formSection.classList.remove("overlay")
            overlayAdd.style.display = 'none'
            resetForm()
            renderForm()
            saveBtn.removeEventListener('click', uptatedFunction)
            saveBtn.addEventListener('click', saveBtnFunction)
        }
        saveBtn.removeEventListener('click', saveBtnFunction)
        saveBtn.addEventListener('click', uptatedFunction)
    }
    if (e.target.classList.contains('delete')) {
        let tr = e.target.parentElement;
        let id = tr.dataset.id;
        let index = id - 1
        contactList.splice(index, 1)
        localStorage.setItem("contact", JSON.stringify(contactList));
        renderForm();
    }
})
let searchInput = document.getElementById('search')
let formSearch = searchInput.parentElement
let trElem = document.querySelectorAll('tbody tr')
formSearch.addEventListener('submit',e=>e.preventDefault())
searchInput.addEventListener('keyup',()=>{
let searchInputValue = searchInput.value.toLowerCase();
trElem.forEach(tr=>{
    trName = tr.children[1].textContent.toLowerCase();
    if(trName.includes(searchInputValue)){
        tr.style.display="";
    }else{
        tr.style.display='none';
    }
})
});
