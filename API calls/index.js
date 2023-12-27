const container = document.querySelector(".container");
const button = document.querySelector(".btn");
function renderUser(data) {
  let html1 = `
    <div class="profile">
        <img
          src="${data.picture.large}"
          alt="" />

        <div class="name">${data.name.title}. ${data.name.first}</div>
        <div class="num">Number: <span class="numcontent">${data.phone}</span></div>
        <div class="email">
          Email: <span class="emailcontent">${data.email}</span>
        </div>
        <div class="adress">
          Adress: <span class="adresscontent">${data.location.city}</span>
        </div>
    </div>      
`;

  container.insertAdjacentHTML("beforeend", html1);
}
function renderCountry(data) {
  let html2 = `
    <div class="country">
        <img
          src="${data.flags.svg}"
          alt="" />
        <div class="continent">
          Continent:<span class="continentContent">${data.continents[0]}</span>
        </div>
        <div class="capital">Capital: <span>${data.capital}</span></div>
        <div class="population">Population: <span>${(
          data.population / 100000
        ).toFixed(2)}M</span></div>
    </div>
      `;
  container.insertAdjacentHTML("beforeend", html2);
}

const person = async function () {
  const persondata = await fetch("https://randomuser.me/api/");
  const data = await persondata.json();
  const finalData = data.results[0];
  renderUser(finalData);
  console.log(finalData);
  const country = finalData.location.country;
  return country;
};

const country = async function () {
  let countryName = await person();
  let countryData = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  let [data] = await countryData.json();
  renderCountry(data);
};
button.addEventListener("click", function () {
  //   container.textContent = "";
  country();
});
