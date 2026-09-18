import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Country} from "./pages/Country.tsx";

export function Router () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/country/:id" element={<Country />} />
            </Routes>
        </BrowserRouter>
    )
}