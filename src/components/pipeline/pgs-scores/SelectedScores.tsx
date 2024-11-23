import React from "react";

interface SelectedScoresType {
    title: string,
    scoreType: string,
    label: string,
    pgsUrl: string,
    pgsIdsSize: number
}

export const SelectedScores = ({title, scoreType, label, pgsUrl, pgsIdsSize}: SelectedScoresType) => {
    return (
        <table className="vf-table">
            <thead>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colSpan={2}><h3>{title}</h3></td>
            </tr>
            <tr className="vf-table__row">
                <th className="vf-table__heading" scope="col">{scoreType}</th>
                <th className="vf-table__heading" scope="col">Number of scores</th>
            </tr>
            </thead>
            <tbody>
            <tr className="vf-table__row">
                <td className="vf-table__cell">{label}</td>
                <td className="vf-table__cell">
                    <a href={pgsUrl}
                       className="vf-link"
                       target="_blank"
                       rel="noopener noreferrer">{pgsIdsSize} scores
                        in PGS catalog</a>
                </td>
            </tr>
            </tbody>
        </table>
    );
}
