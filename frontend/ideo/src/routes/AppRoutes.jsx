import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages";

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<LandingPage{...props} />}></Route>
        </Routes>
    )
}