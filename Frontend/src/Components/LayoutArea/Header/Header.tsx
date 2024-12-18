import { Menu } from "../Menu/Menu";
import { UserMenu } from "../UserMenu/UserMenu";
import "./Header.css";

export function Header(): JSX.Element {

    return (
        <div className="Header">
            <div className="header-center">
                <Menu />
            </div>
            <div className="header-right">
                <UserMenu />
            </div>
        </div>
    );
}
