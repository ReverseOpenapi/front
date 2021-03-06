import React, { useState, useEffect } from "react";

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
import { FaWpforms } from "react-icons/fa";
import { BsTable } from "react-icons/bs";
import { GrLink } from "react-icons/gr";
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";
import "./Mcd.css";
import DictionaryCard from "../components/Dictionary/DictionaryCard";
import CreateSchemaForm from "../components/Schema/CreateSchemaForm";
import { RelationCard } from "../components/Relations/RelationCard";
import SchemaCard from "../components/Schema/SchemaCard";
import Home from "../components/Home/Home";
import Form from "../../form/pages/Form";
import Loading from "../components/common/Loading";

const Mcd = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [selected, setSelected] = useState(1);
  const [hasLoaded, setHasLoading] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const selectedItem = (param) => {
    setSelected(param);
  };

  useEffect(() => {
    const existingSelectedItem = JSON.parse(
      localStorage.getItem("selected_item")
    );
    setSelected(existingSelectedItem);
    setHasLoading(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("selected_item", JSON.stringify(selected));
  }, [selected]);

  return hasLoaded ? (
    <div>
      <Loading />
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
                icon={<FaWpforms />}
                onClick={() => selectedItem(1)}
              >
                Form
              </MenuItem>
              <MenuItem
                active={selected === 2 ? true : false}
                icon={<FaList />}
                onClick={() => selectedItem(2)}
              >
                Dictionary
              </MenuItem>
              <MenuItem
                active={selected === 3 ? true : false}
                icon={<BsTable />}
                onClick={() => selectedItem(3)}
              >
                Schema
              </MenuItem>
              <MenuItem
                active={selected === 5 ? true : false}
                icon={<MdOutlineSchema />}
                onClick={() => selectedItem(5)}
              >
                Mcd
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
        {selected === 0 && (
          <div
            style={{
              marginLeft: menuCollapse === true ? "80px" : "220px",
              transition: "all 1s ease-in-out",
            }}
          >
            <Home />
          </div>
        )}
        {selected === 1 && (
          <div
            style={{
              marginLeft: menuCollapse === true ? "80px" : "220px",
              transition: "all 1s ease-in-out",
            }}
          >
            <Form />
          </div>
        )}

        {selected === 2 && (
          <div
            style={{
              marginLeft: menuCollapse === true ? "80px" : "220px",
              transition: "all 1s ease-in-out",
            }}
          >
            <DictionaryCard />
          </div>
        )}
        {selected === 3 && (
          <div
            style={{
              marginLeft: menuCollapse === true ? "80px" : "220px",
              transition: "all 1s ease-in-out",
            }}
          >
            <CreateSchemaForm />
          </div>
        )}
        {selected === 4 && (
          <div
            style={{
              marginLeft: menuCollapse === true ? "80px" : "220px",
              transition: "all 1s ease-in-out",
            }}
          >
            <RelationCard />
          </div>
        )}
        {selected === 5 && (
          <div
            style={{
              marginLeft: menuCollapse === true ? "80px" : "220px",
              transition: "all 1s ease-in-out",
            }}
          >
            <SchemaCard />
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Mcd;
