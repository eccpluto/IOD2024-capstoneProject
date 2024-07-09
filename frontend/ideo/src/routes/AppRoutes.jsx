import { Route, Routes } from "react-router-dom";
import { AccountPage, BoardsPage, LandingPage, LibraryPage, LoginPage, PageNotFoundPage } from "../pages";

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<LandingPage{...props} />} />
            <Route path="/account" element={<AccountPage{...props} />} />
            <Route path="/boards" element={<BoardsPage{...props} />} />
            <Route path="/library" element={<LibraryPage{...props} />} />
            <Route path="/login" element={<LoginPage{...props} />} />
            <Route path="*" element={<PageNotFoundPage{...props} />} />
        </Routes>
    )
}