    import "./Copyrights.css";

    export function Copyrights(): JSX.Element {
        const year = new Date().getFullYear();
        return (
            <div className="Container">
                <p className="CopyrightsText">All Rights Reserved To Shahar Maoz {year} ©</p>
            </div>
        );
    }
