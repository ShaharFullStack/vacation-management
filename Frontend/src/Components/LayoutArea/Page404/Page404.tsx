import { useTitle } from "../../../Utils/UseTitle";
import "./Page404.css";

export function Page404(): JSX.Element {

    useTitle("Shahar 404 | Page Not Found");

    return (
        <div className="Page404">

            <h1>Page Not Found</h1>

        </div>
    );
}
