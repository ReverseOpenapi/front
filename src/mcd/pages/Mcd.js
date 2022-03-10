import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList } from "react-icons/fa";
import { MdOutlineSchema } from "react-icons/md";
import { BsTable } from "react-icons/bs";
import { GrLink } from "react-icons/gr";
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";
import "./Mcd.css";
import DictionaryCard from "../components/Dictionary/DictionaryCard";
import CreateEntityForm from "../components/Entities/CreateEntityForm";
import { RelationCard } from "../components/Relations/RelationCard";
import SchemaCard from "../components/Schema/SchemaCard";
import Home from "../components/Home/Home";

const Mcd = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [selected, setSelected] = useState(1);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const selectedItem = (param) => {
    setSelected(param);
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "MCD" : "Modélisation"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                active={selected === 0 ? true : false}
                icon={<FiHome />}
                onClick={() => selectedItem(0)}
              >
                Home
              </MenuItem>
              <MenuItem
                active={selected === 1 ? true : false}
                icon={<FaList />}
                onClick={() => selectedItem(1)}
              >
                Dictionary
              </MenuItem>
              <MenuItem
                active={selected === 2 ? true : false}
                icon={<BsTable />}
                onClick={() => selectedItem(2)}
              >
                Collection
              </MenuItem>
              <MenuItem
                active={selected === 3 ? true : false}
                icon={<GrLink />}
                onClick={() => selectedItem(3)}
              >
                Relation
              </MenuItem>
              <MenuItem
                active={selected === 4 ? true : false}
                icon={<MdOutlineSchema />}
                onClick={() => selectedItem(4)}
              >
                Schema
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem>Hetic@2022</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
      <div>
        {selected === 0 && <Home />}
        {selected === 1 && <DictionaryCard />}
        {selected === 2 && <CreateEntityForm />}
        {selected === 3 && <RelationCard />}
        {selected === 4 && <SchemaCard />}
      </div>
    </>
  );
};

export default Mcd;
