import "./PayslipPage.css";

const payslipHistory = [
    {
        month: "March",
        netSalary: "33 000kr",
        hoursWorked: 160,
    },
    {
        month: "Februrary",
        netSalary: "33 000kr",
        hoursWorked: 160,
    },
    {
        month: "January",
        netSalary: "33 000kr",
        hoursWorked: 160,
    },
    {
        month: "December",
        netSalary: "33 000kr",
        hoursWorked: 160,
    },
    {
        month: "November",
        netSalary: "33 000kr",
        hoursWorked: 160,
    },
    {
        month: "October",
        netSalary: "33 000kr",
        hoursWorked: 160,
    },
    {
        month: "September",
        netSalary: "33 000kr",
        hoursWorked: 160,
    },
];

function PayslipPage() {
  return (
    <div className="payslip-page">

      <h1 className="payslip-title">PAYSLIP</h1>

      <div className="payslip-content">

        <h2 className="payslip-subtitle">
            Payslip Batch Details
        </h2>

        <div className="batch-summary-card">

            <h3>Batch Summary</h3>

            <div className="summary-grid">

            <div className="summary-item">
                <p>CURRENT PERIOD</p>
                <h4>April 2026</h4>
            </div>

            <div className="summary-item">
                <p>HOURS WORKED</p>
                <h4>160 hours</h4>
            </div>

            <div className="summary-item">
                <p>GROSS SALARY</p>
                <h4>38 000kr</h4>
            </div>

            <div className="summary-item">
                <p>NET SALARY</p>
                <h4>33 000kr</h4>
            </div>

            <div className="summary-item">
                <p>TAX DEDUCTED</p>
                <h4>12 540kr</h4>
            </div>

            </div>
        </div>

        <div className="history-card">

            <h3>Previous Payslips</h3>

            <div className="table-wrapper">
                <table className="history-table">

                <thead>
                    <tr>
                    <th>MONTH</th>
                    <th>NET SALARY</th>
                    <th>HOURS WORKED</th>
                    </tr>
                </thead>

                <tbody>

                    {payslipHistory.map((payslip, index) => (
                    <tr key={index}>
                        <td>{payslip.month}</td>
                        <td>{payslip.netSalary}</td>
                        <td>{payslip.hoursWorked}</td>
                    </tr>
                    ))}

                </tbody>

                </table>
            </div>
        </div>
      </div>

    </div>
  );
}

export default PayslipPage;
