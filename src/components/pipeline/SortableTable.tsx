import React, {CSSProperties, useState} from 'react';
import {ASC, DESC, EMPTY} from "../../util/Constants";

interface ColumnConfig {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (item: any) => React.ReactNode;
}

interface SortableTableProps {
    data: any[];
    columns: ColumnConfig[];
    onRowClick?: (item: any) => void;
    initialSortColumn?: string;
    initialSortDirection?: 'asc' | 'desc';
    title?: string;
}

interface DataItem {
    [key: string]: string | number | null; // Adjust types as needed
}

const TdTextAlign: CSSProperties = {
    textAlign: "left"
}

const SortableTable: React.FC<SortableTableProps> = ({
                                                         data = [],
                                                         columns,
                                                         onRowClick,
                                                         initialSortColumn,
                                                         initialSortDirection = DESC,
                                                         title
                                                     }) => {
    const [sortColumn, setSortColumn] = useState<string>(initialSortColumn || columns[0].key);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);

    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === ASC ? DESC : ASC);
        } else {
            setSortColumn(column);
            setSortDirection(ASC);
        }
    };

    const sortedData = [...data].sort((a: DataItem, b: DataItem) => {
        const aValue = a[sortColumn] || EMPTY;
        const bValue = b[sortColumn] || EMPTY;
        return sortDirection === ASC
            ? aValue.toString().localeCompare(bValue.toString())
            : bValue.toString().localeCompare(aValue.toString());
    });
    return (
        <div className="vf-content">
            {title && <h1 className="vf-text vf-text-heading--1">{title}</h1>}
            <table className="vf-table vf-table-additional">
                <thead className="vf-table__header">
                <tr>
                    <th colSpan={3} align="left">[All times in UTC]</th>
                </tr>
                <tr className="vf-table__row">
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            className="vf-table__heading"
                            scope="col"
                            onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                            <button
                                className="vf-button vf-button--sm vf-button--icon vf-table__button vf-table__button--sortable">
                                {col.label}
                                {col.sortable && sortColumn === col.key && (
                                    <span>{sortDirection === ASC ? '↑' : '↓'}</span>
                                )}
                            </button>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="vf-table__body">
                {sortedData.length > 0 ? (
                    sortedData.map((item, index) => (
                        <tr className="vf-table__row"
                            key={index}
                            onClick={() => onRowClick && onRowClick(item)}>
                            {columns.map((col) => (
                                <td key={col.key} className="vf-table__cell" style={TdTextAlign}>
                                    {col.render ? col.render(item) : item[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="vf-table__cell">
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default SortableTable;
