import React, {CSSProperties} from "react";
import {ScoreType} from "./SelectPolygenicScoresByTrait";

interface ScoreResultListType {
    ulStyle: CSSProperties,
    scores: ScoreType[],
    selectScore: (args: ScoreType) => void
}

export const ScoreResultList = ({ulStyle, scores, selectScore}: ScoreResultListType) => {
    return (
        <ul id="vf-form--search__results-list"
            className="vf-list | vf-form--search__results-list | vf-stack vf-stack--custom"
            style={ulStyle} aria-labelledby="searchitem">
            {scores.map((score, index) => (
                <li id={"vf-form--search__results-list--" + index}
                    className="vf-list__item"
                    role="option"
                    onClick={() => selectScore({
                        id: score.id,
                        label: score.label,
                        pgsIdsSize: score.pgsIdsSize
                    })}>
                    {score.label}
                </li>
            ))}
        </ul>
    );
}
