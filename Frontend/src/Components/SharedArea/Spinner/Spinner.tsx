import "./Spinner.css";
import imageSource from "../../../Assets/Images/Spinner/animatedLogo.gif";

export function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<img className="SpinnerImg" src={imageSource} alt="Loading spinner" />
        </div>
    );
}
