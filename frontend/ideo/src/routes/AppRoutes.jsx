import { Route, Routes } from "react-router-dom";
import {
    AccountPage,
    BoardsPage,
    LandingPage,
    LibraryPage,
    LoginPage,
    LogoutPage,
    PageNotFoundPage,
    CreateAccountPage
} from "../pages";

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<LandingPage{...props} />} />
            <Route path="/account" element={<AccountPage{...props} />} />
            <Route path="/boards" element={<BoardsPage{...props} />} />
            <Route path="/create" element={<CreateAccountPage{...props} />} />
            <Route path="/library" element={<LibraryPage{...props} />} />
            <Route path="/login" element={<LoginPage{...props} />} />
            <Route path="/logout" element={<LogoutPage{...props} />} />
            <Route path="*" element={<PageNotFoundPage{...props} />} />
        </Routes>
    )
}