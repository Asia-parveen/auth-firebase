import { getDatabase, set, ref, db, get, remove, update } from "./firebase.js";
const addData = document.getElementById("addData");
const notification = document.getElementById("notification");

function addStudents() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const rollnumber = document.getElementById("rollnumber").value;
  console.log(name, email, rollnumber);

  set(ref(db, "students/" + rollnumber), {
    name: name,
    email: email,
    rollnumber: rollnumber,
  });
  notification.innerText = "Added Data Successful1y";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("rollnumber").value = "";
  readData();
}

addData.addEventListener("click", addStudents);

// read data
function readData() {
  const userRef = ref(db, "students/");
  get(userRef).then((snapshot) => {
    const data = snapshot.val();
    const table = document.querySelector("table");
    let html = "";
    for (const key in data) {
      const { name, email, rollnumber } = data[key];
      html += `<tr>
            <td>
            ${name}
            </td>
             <td>
            ${email}
            </td>
             <td>
            ${rollnumber}
            </td>
            <td><button class="del" onclick="deleteData('${rollnumber}')">Delete data</button></td>
              <td><button class="up" onclick="updateData('${rollnumber}')">Update Data</button></td>
                      
            </tr>
            `
            
    }
    table.innerHTML = html;
  });
}
readData();

// delete data
window.deleteData = function (rollnumber) {
  // alert(rollnumber)
  const userRef = ref(db, `students/${rollnumber}`);
  remove(userRef);
  notification.innerText = "Data deleted successfully";
  readData();
};
// update data

window.updateData = function (rollnumber) {
  // alert(rollnumber)
  const userRef = ref(db, `students/${rollnumber}`);
  get(userRef).then((item) => {
    document.getElementById("name").value = item.val().name;
    document.getElementById("email").value = item.val().email;
    document.getElementById("rollnumber").value = item.val().rollnumber;
  });

  document.querySelector(".update_Data").classList.add("show");

  const update_btn = document.querySelector("#update_data");

  update_btn.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rollnumber = document.getElementById("rollnumber").value;

    update(ref(db), {
      [`students/${rollnumber}/name`]: name,
      [`students/${rollnumber}/email`]: email,
      [`students/${rollnumber}/rollnumber`]: rollnumber,
    }).then(() => {
      notification.innerText = "data updated successfully";
      document.querySelector(".update_Data").classList.remove("show");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("rollnumber").value = "";
      readData();
    });
  });
};
