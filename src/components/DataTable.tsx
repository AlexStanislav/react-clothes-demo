import "@/assets/css/components/DataTable.css";
import { useState } from "react";

function getIndividualDisplaySort(columns: string[]) {
  const displaySort = columns.map((column) => {
    return {
      [column]: "asc",
    };
  });

  return displaySort;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsedColumnValue(column: string, value: { [key: string]: any }) {
  const columnValue = column.toLowerCase().replace(/\s/g, "_");
  if (typeof value[columnValue] === "object") {
    return Object.values(value[columnValue]).join(" ");
  } else {
    return value[columnValue];
  }
}

function DataTable({
  columns,
  values,
  actions,
  modalId,
  canDeleteValues,
}: {
  columns: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: { id: number; [key: string]: any }[];
  actions?: {
    view?: (value: { id: number }) => void;
    delete?: (id: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sort?: React.Dispatch<React.SetStateAction<any>>;
  };
  modalId?: string;
  canDeleteValues?: boolean;
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentConfirmId, setCurrentConfirmId] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortDirectionDisplay, setSortDirectionDisplay] = useState(
    getIndividualDisplaySort(columns)
  );

  /**
   * Shows the delete confirmation modal for the given product ID.
   * @param {number} id The ID of the product to delete.
   */
  const handleShowConfirmation = (id: number) => {
    setCurrentConfirmId(id);
    setShowDeleteConfirmation(true);
  };

  /**
   * Confirms the deletion of the product with the given ID.
   * @param {number} id The ID of the product to delete.
   */
  const handleConfirmDelete = (id: number) => {
    actions?.delete?.(id);
    setShowDeleteConfirmation(false);
    setCurrentConfirmId(null);
  };

  const sortColumn = (column: string) => {
    const sortedValues = [...values].sort((a, b) => {
      const parsedColumn = column.toLowerCase();
      if (sortDirection === "asc") {
        return a[parsedColumn] > b[parsedColumn] ? 1 : -1;
      } else {
        return a[parsedColumn] < b[parsedColumn] ? 1 : -1;
      }
    });

    // Toggle the sort direction and update the state
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortDirectionDisplay({
      ...sortDirectionDisplay,
      [column]: sortDirection,
    });

    actions?.sort?.(sortedValues);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>
              {column.toLowerCase() !== "actions" && (
                <i
                  className={`${
                    (sortDirectionDisplay as unknown as Record<string, string>)[
                      column
                    ] === "asc"
                      ? "bi bi-sort-down"
                      : "bi bi-sort-up"
                  }`}
                  onClick={() => sortColumn(column)}
                ></i>
              )}
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values?.map((value, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index}>
                {column.toLowerCase() !== "actions" ? (
                  parsedColumnValue(column, value) +
                  " " +
                  (column.toLowerCase().includes("price") ? "€" : "")
                ) : (
                  <div className="table__actions">
                    <button
                      className="btn btn-success bi bi-eye"
                      data-bs-toggle="modal"
                      data-bs-target={`#${modalId}`}
                      onClick={() => actions?.view?.(value)}
                    ></button>
                    {canDeleteValues && (
                      <>
                        <button
                          className="btn btn-danger bi bi-trash-fill"
                          onClick={() => handleShowConfirmation(value.id)}
                        ></button>

                        {showDeleteConfirmation &&
                          currentConfirmId === value.id && (
                            <div
                              className="delete-confirm"
                              data-confirm-id={value.id}
                            >
                              <i className="bi bi-exclamation-triangle"></i>
                              <span>
                                Are you sure you want to delete this record?
                              </span>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleConfirmDelete(value.id)}
                              >
                                Yes
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={() => setShowDeleteConfirmation(false)}
                              >
                                No
                              </button>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
