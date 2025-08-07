document.addEventListener("DOMContentLoaded", function () {
  const balancesData = [
    {
      year: 2023,
      file: "/assets/modules/servicios/balanceGeneral/docs/BALANCE GENERAL 2023_superarse.pdf",
    },
    {
      year: 2022,
      file: "/assets/modules/servicios/balanceGeneral/docs/BALANCE GENERAL 2022_superarse.pdf",
    },
    {
      year: 2021,
      file: "/assets/modules/servicios/balanceGeneral/docs/BALANCE GENERAL 2021_superarse.pdf",
    },
    {
      year: 2020,
      file: "/assets/modules/servicios/balanceGeneral/docs/BALANCE GENERAL 2020_superarse.pdf",
    },
    {
      year: 2019,
      file: "/assets/modules/servicios/balanceGeneral/docs/BALANCE GENERAL 2019_superarse.pdf",
    },
  ];

  const balancesList = document.getElementById("balances-list");

  if (balancesList) {
    // Sort data by year in descending order
    balancesData.sort((a, b) => b.year - a.year);

    balancesData.forEach((balance) => {
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";

      const yearSpan = document.createElement("span");
      yearSpan.textContent = `BALANCE GENERAL ${balance.year}`;

      const link = document.createElement("a");
      link.href = balance.file;
      link.target = "_blank";
      link.className = "btn btn-sm btn-primary";

      const icon = document.createElement("i");
      icon.className = "fa fa-file-pdf mr-2";

      link.appendChild(icon);
      link.appendChild(document.createTextNode(" Ver PDF"));
      listItem.appendChild(yearSpan);
      listItem.appendChild(link);
      balancesList.appendChild(listItem);
    });
  }
});