import React from 'react';

export default function Table({ columns = [], data = [] }) {
  return (
    <div className="table-container overflow-x-auto">
      <table className="table w-full border-collapse">
        <thead className="table-head">
          <tr className="table-head-row">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="table-head-cell border px-4 py-2 text-left"
                scope="col"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="table-body">
          {data.map((row, rowIndex) => (
            <tr key={row.id ?? `row-${rowIndex}`} className="table-row">
              {columns.map((column) => (
                <td
                  key={`${row.id ?? rowIndex}-${column.accessor}`}
                  className="table-cell border px-4 py-2"
                >
                  {row[column.accessor] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Example usage
const columns = [
  { header: "SN", accessor: "sn" },
  { header: "Name", accessor: "name" },
  { header: "Position", accessor: "position" }
];

const data = [
  { sn: 1, name: "Prof. Amal Kr. Ghosh", position: "President" },
  { sn: 2, name: "Ms. Ina Bose", position: "Vice President" }
];

<Table columns={columns} data={data} />
*/
