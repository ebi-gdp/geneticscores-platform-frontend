import React, {useMemo} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {LandingPage} from "../components/LandingPage";
import {DPA_URI, NOT_FOUND_URI, PGS_CALCULATOR, PROFILE_URI, UNAUTHORISED} from "../util/URIConstants";
import {Unauthorised} from "../components/error/Unauthorised";
import {NotFound} from "../components/error/NotFound";
import {PGSCalculator} from "../components/pipeline/PGSCalculator";
import {DPAConsent} from "../components/user/DPAConsent";
import {ProfileDetails} from "../components/user/ProfileDetails";
import {BuildDataset} from "../components/pipeline/dataset/BuildDataset";
import {Datasets} from "../components/pipeline/dataset/Datasets";
import {Pipelines} from "../components/pipeline/Pipelines";
import {PipelineDetails} from "../components/pipeline/PipelineDetails";
import {PipelineResult} from "../components/pipeline/PipelineResult";
import {DashboardLandingPage} from "../components/DashboardLandingPage";

export const AllRoutes = () => {
    const pipelineBasePathKey = "pipeline-base-path";

    const PublicRoutes = useMemo(() => [
        {key: "base-path", path: "/", component: <LandingPage/>}
    ], []);
    const ProtectedUserRoutes = useMemo(() => [
        {key: "consent", path: DPA_URI, component: <DPAConsent/>},
        {key: "profile", path: PROFILE_URI, component: <ProfileDetails/>}
    ], []);
    const ProtectedRoutes = useMemo(() => [
        {key: "dataset", path: `${PGS_CALCULATOR}/dataset`, component: <BuildDataset/>},
        {key: "specific-dataset", path: `${PGS_CALCULATOR}/dataset/:datasetId`, component: <BuildDataset/>},
        {key: "datasets", path: `${PGS_CALCULATOR}/datasets`, component: <Datasets/>},
        {key: "pipelines", path: `${PGS_CALCULATOR}/dashboard`, component: <DashboardLandingPage/>},
        {key: "pipelines", path: `${PGS_CALCULATOR}/pipelines`, component: <Pipelines/>},
        {key: "specific-pipeline", path: `${PGS_CALCULATOR}/pipeline/:pipelineId`, component: <PipelineDetails/>},
        {key: "result", path: `${PGS_CALCULATOR}/result`, component: <PipelineResult/>}
    ], []);
    const ErrorRoutes = useMemo(() => [
        {key: "unauthorised", path: UNAUTHORISED, component: <Unauthorised/>},
        {key: "not-found", path: NOT_FOUND_URI, component: <NotFound/>},
        {key: "not-found-navigation", path: "*", component: <Navigate to={NOT_FOUND_URI}/>}
    ], []);

    const publicRoutes = useMemo(() => {
        return PublicRoutes.map(route => (
            <Route key={route.key} path={route.path} element={route.component}/>
        ));
    }, [PublicRoutes]);

    const errorRoutes = useMemo(() => {
        return ErrorRoutes.map(route => (
            <Route key={route.key} path={route.path} element={route.component}/>
        ))
    }, [ErrorRoutes]);

    const baseBath = useMemo(() => {
        return <Route key={`${pipelineBasePathKey}`} path={`${PGS_CALCULATOR}`}
                      element={<PGSCalculator/>}/>
    }, [pipelineBasePathKey]);

    const authenticatedUserConsentRevoked = useMemo(() => {
        return ProtectedUserRoutes.map(route => (
            <Route key={route.key} path={route.path} element={route.component}/>
        ))
    }, [ProtectedUserRoutes]);

    const authenticatedUserConsentGiven = useMemo(() => {
        return ProtectedRoutes.map(route => (
            <Route key={route.key} path={route.path} element={route.component}/>
        ))
    }, [ProtectedRoutes]);

    const commonRoutes = (
        <>
            {publicRoutes}
            {baseBath}
            {errorRoutes}
        </>
    );
    return (
        <Routes>
            {commonRoutes}
            {authenticatedUserConsentRevoked}
            {authenticatedUserConsentGiven}
        </Routes>
    );
}
