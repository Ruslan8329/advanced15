document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const contactList = document.getElementById("contact-list");
  const sortNameBtn = document.getElementById("sort-name");
  const sortPhoneBtn = document.getElementById("sort-phone");
  const sortEmailBtn = document.getElementById("sort-email");

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  function renderContacts() {
    contactList.innerHTML = "";
    contacts.forEach((contact, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                ${contact.name} - ${contact.phone} - ${contact.email}
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
            `;
      contactList.appendChild(li);
    });
  }

  window.addContact = function (name, phone, email) {
    contacts.push({ name, phone, email });
    saveContacts();
    renderContacts();
  };

  window.deleteContact = function (index) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  };

  window.editContact = function (index) {
    const contact = contacts[index];
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;
    deleteContact(index);
  };

  function sortContacts(property) {
    contacts.sort((a, b) => a[property].localeCompare(b[property]));
    renderContacts();
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    addContact(name, phone, email);
    contactForm.reset();
  });

  sortNameBtn.addEventListener("click", () => sortContacts("name"));
  sortPhoneBtn.addEventListener("click", () => sortContacts("phone"));
  sortEmailBtn.addEventListener("click", () => sortContacts("email"));

  renderContacts();
});
