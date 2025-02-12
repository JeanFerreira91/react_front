import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { motion } from "framer-motion";
import { customStyles } from "./barstyles";
import logo from "./oferta-especial.png";
// import chroma from 'chroma-js';
// import FetchData2 from "../data/data";
//fortawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin, faAmazon } from "@fortawesome/free-brands-svg-icons";

function UpdateCompo() {
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const history = useHistory();
  const url = "https://amazfunels.herokuapp.com/api/";

  useEffect(() => {
    let baseUrl;
    let category = "";
    console.log(history);
    if (history?.location?.pathname?.split("/")[1]) {
      category = history?.location?.pathname?.split("/")[1];
      baseUrl = `${url}categorias/?search=${category}`;
    } else {
      baseUrl = url;
    }
    fetch(baseUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setSelectedValue({ name: category });
        },
        (error) => {
          setIsLoaded(true);
          console.log(error);
        }
      );
  }, []);
  // handle input change event
  // const handleInputChange = (value) => {
  //   setValue(value);
  //   console.log(value);
  // };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <FontAwesomeIcon icon={faSearchengin} size="2xl" />
        </components.DropdownIndicator>
      )
    );
  };

  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  /// load options
  const loadOptions = (inputValue) => {
    console.log(inputValue);
    return fetch(`${url}categorias/?search=${inputValue}`)
      .then((res) => res.json())
      .then();
  };

  // error catch
  // function FetchData() {
  //  const data = fetch(`${url}?search=${selectedValue.name}`)
  //         .then((res) => res.json())
  //         .then((data) => setItems(data));
  //         return (data);

  useEffect(() => {
    if (selectedValue) {
      const getSearch = () => {
        fetch(`${url}?search=${selectedValue.name}`)
          .then((res) => res.json())
          .then((data) => setItems(data));
      };
      getSearch();
    }
  }, [selectedValue]);

  // cargando
  if (!isLoaded) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  // cargado
  else {
    return (
      <div>
        
          <AsyncSelect
            className="search-input"
            defaultOptions
            type="text"
            components={{ DropdownIndicator }}
            styles={customStyles}
            onMouseEnter={selectedValue}
            placeholder="Search..."
            value={selectedValue}
            getOptionLabel={(e) => e.name}
            loadOptions={loadOptions}
            // onInputChange={handleInputChange}

            onChange={handleChange}
          />
        

        <div className="contenido">
          {items.map((todo) => (
            <motion.a
              className="card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.9 }}
              key={todo.id}
              href={todo.url_amazon}
            >
              <Card.Body>
                <div className="contador-is_especial">
                <div className="contador">
                  <p></p>
                </div>
                <div> {todo.is_especial === true && (
                  <img src={logo} width="30 rem" height="30 rem" alt="logo" />
                )}</div>
                </div>

               

                <div className="category-text-card"> <a href={todo.category}>{todo.category}</a> </div>
                <Card.Img
                  style={{ backgroundImage: `url(${todo.item_pictures})` }}
                />
                <Card.Text> {todo.item_description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-primary botonCheck"
                  type="submit"
                >
                  Check it NOW!
                </motion.button>

                <br />
                <FontAwesomeIcon icon={faAmazon} size="lg" />
                <small className="text-muted">{"  "}Amazon.co.uk</small>
              </Card.Footer>
            </motion.a>
          ))}
        </div>
      </div>
    );
  }
}
export default UpdateCompo;
