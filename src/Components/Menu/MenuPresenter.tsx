import React from "react";
import {Link} from "react-router-dom"
import "./styles.css";

const MenuPresenter = ({ driving, toggleDriving, name }) => {
  return <div className={"MenuPresenter__container"}>
      <div className={"MenuPresenter__container__header"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill={"white"} viewBox="0 0 24 24">
          <path d="M18 11c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 
            6-6-2.687-6-6-6zm-2.888 7.858c.28-.201.147-.446-.025-.649-.073-.086-.474-.5-.519-.426.034-.113-.073-.386-.137-.494-.108-.181-.251-.292-.309-.491-.022-.079-.022-.32-.069-.375l-.158-.117c.139-.828.522-1.572 1.075-2.16l.373-.15c.234-.352.247-.079.458-.17.07 
            0 .15-.289.226-.334.131-.084.031-.084.006-.123-.051-.083 1.096-.501 1.115-.426.016.063-.567.368-.503.358-.148.02-.176.286-.148.284.074-.002.537-.352.753-.277.211.073.591-.168.74-.291.075-.062.144-.172.242-.172.455 0 1.134.188 1.29.28.237.141-.102.131-.139.223l-.125.206c-.051.066-.199.038-.17-.041.03-.083.174-.115-.043-.135-.222-.021-.284-.17-.506.017-.067.056-.117.143-.161.216l-.272.198c-.06.096.035.256.152.185.031-.019.382.322.337.048-.029-.183.098-.307.101-.444.001-.091.14-.033.103.015-.048.061-.102.267.025.277.055.004.212-.115.23-.026-.026-.086-.177.176-.167.172-.054.024-.117-.01-.075.105.037.113-.204.1-.248.123-.018.01-.208-.057-.204-.014l-.036-.211c-.055.084-.029.256-.147.256-.101 0-.241.115-.301.185-.043.048-.305.153-.333.15.149.016.143.125.13.219-.03.216-.498.016-.478.098.019.079-.054.293-.07.362-.015.062.201.103.188.134l.32-.125.065-.147.175-.089.074-.129c.025-.01.323-.056.344-.046.075.034.213.177.265.242l.114.094-.003.111c.052.097.066-.2.044-.145 0-.095.07.035.086.024l-.329-.327c-.102-.171.272.091.321.123.047.032.142.314.268.251l.053-.115.225-.044c-.178.13.139.301.091.278l.177-.011c.028.011.332.007.283-.041.076.038.041.374-.022.425-.102.084-.591.049-.7-.029-.181-.131-.148.139-.236.176-.171.071-.429-.231-.609-.241.087.014.008-.223.008-.238-.07-.086-.51.009-.626.025-.217.029-.444.026-.611.162l-.238.325-.228.095c-.117.111-.251.276-.317.422l.02.287c-.153.483.038 1.154.625 1.228.143.018.29.095.434.052.115-.035.216-.113.339-.122.171-.011.1.241.335.172.114-.034.166.078.166.163-.038.178-.122.277.041.401.11.085.201.208.221.354.012.083.089.225-.006.273-.068.034-.118.23-.117.295.014.075.166.219.211.282l.072.301.146.293c.051.147.436-.003.525-.003.306.002.461-.429.676-.562l.231-.385c.135-.098.277-.157.289-.337.01-.156-.118-.482-.047-.615.085-.157.985-1.429.717-1.493l-.38.18c-.074.006-.357-.3-.431-.375-.139-.138-.199-.384-.312-.552-.066-.099-.267-.294-.267-.417.009.022.093.164.132.134l.007-.069c-.002.037.235.31.286.339l.229.34c.218.167.158.644.478.354.214-.193.633-.561.521-.896-.059-.178-.33-.047-.413.016-.089-.047-.415-.402-.287-.449.063-.022.202.164.252.192l.238-.003c.068.143.519-.147.625-.105.071.027.126.085.15.157.075.23.149.666.149 1.097 0 2.299-1.864 4.162-4.162 4.162-1.184 0-2.251-.494-3.008-1.286-.09-.094-.158-.318-.009-.409l.151-.039c.116-.096-.112-.501-.022-.566zm4.877-3.974c.18.064.016.188-.088.159-.057-.016-.352-.105-.362.01 0 .069-.28 0-.236-.072l.076-.232c.08-.105.157-.048.159.013 0 .163.165-.154.256-.165l-.044.069c.013.106.09.165.239.218zm-9.93 3.05l-3.059 2.207v-13.068l4-2.886v8.942c.507-.916 1.189-1.719 2-2.37v-6.572l4 2.886v1.997c.328-.042.661-.07 1-.07v-1.929l4-2.479v5.486c.754.437 1.428.992 2 1.642v-10.72l-6.455 4-5.545-4-5.545 4-6.455-4v18l6.455 4 4.137-2.984c-.266-.656-.448-1.354-.533-2.082zm-4.059 2.431l-4-2.479v-13.294l4 2.479v13.294z" />
        </svg>
        <Link to={"/edit-account"}>
          <span className={"MenuPresenter__container__header__text"}>
            WELCOME {name}!
          </span>
        </Link>
      </div>
      <div className={"MenuPresenter__container__body"}>
        <div id={"firstItem"} className={"MenuPresenter__container__body__item"}>
          <Link to={"/trips"}>Trips</Link>
        </div>
        <div className={"MenuPresenter__container__body__item"}>
          <Link to={"/settings"}>Settings</Link>
        </div>
        <div className={driving ? ["MenuPresenter__container__body__item", "drivingmode", "true"].join(" ") : ["MenuPresenter__container__body__item", "drivingmode", "false"].join(" ")} onClick={toggleDriving}>
          {driving ? "Stop Driving" : "Start Driving"}
        </div>
      </div>
    </div>;
};

export default MenuPresenter;