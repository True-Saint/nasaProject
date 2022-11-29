import mainStyles from "./dash.module.css";
import logo from "./React-icon.svg";

<div className={mainStyles.loadingSection}>
    <div className={mainStyles.loading}>
        <img src={logo} className={mainStyles.spinnerLoad} alt="logo"/>
        <small className={mainStyles.textGlow}>Loading Component...</small>
    </div>
</div>