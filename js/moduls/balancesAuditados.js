document.addEventListener("DOMContentLoaded", function () {
  const balancesData = [
    {
      year: 2023,
      file: "/assets/modules/servicios/balancesAuditados/docs/BALANCE GENERAL AUDITADO 2023.pdf",
    },
    {
      year: 2022,
      file: "/assets/modules/servicios/balancesAuditados/docs/BALANCE GENERAL AUDITADO 2022.pdf",
    },
    {
      year: 2021,
      file: "/assets/modules/servicios/balancesAuditados/docs/BALANCE GENERAL AUDITADO 2021.pdf",
    },
    {
      year: 2020,
      file: "/assets/modules/servicios/balancesAuditados/docs/BALANCE GENERAL AUDITADO 2020.pdf",
    },
    {
      year: 2019,
      file: "/assets/modules/servicios/balancesAuditados/docs/BALANCE GENERAL AUDITADO 2019.pdf",
    },
  ];

  const balancesList = document.getElementById("balances-auditados-list");

  if (balancesList) {
    // Ordenar los datos por año de forma descendente
    balancesData.sort((a, b) => b.year - a.year);

    balancesData.forEach((balance) => {
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";

      const yearSpan = document.createElement("span");
      yearSpan.textContent = `BALANCE AUDITADO ${balance.year}`;

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