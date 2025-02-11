// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Card from "../Components/Card";
// import ShowMsg from "../Components/ShowMsg";
// import Footer from "../Components/Footer";
// import Navbar from "../Components/Navbar";
// import ResponsiveNavbar from "../Components/ResponsiveNavbar";

// const GoToCategory = () => {
//   const [shoe, setShoe] = useState([]);
//   const [filteredShoes, setFilteredShoes] = useState([]);
//   const [priceFilter, setPriceFilter] = useState("");
//   const [open, setOpen] = useState(false);
//   const { name } = useParams();

//   const getAllCategoryProduct = async () => {
//     try {
//       let res;
//       if (name === "New") {
//         res = await axios.get("http://localhost:5050/api/v1/shoe/recent");
//       } else if (name === "Kids") {
//         res = await axios.get(
//           "http://localhost:5050/api/v1/shoe/search?type=kid"
//         );
//       } else {
//         res = await axios.get(
//           `http://localhost:5050/api/v1/shoe/search?type=${name}`
//         );
//       }
//       setShoe(res?.data);
//       setFilteredShoes(res?.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllCategoryProduct();
//     document.title = `Puma Shoe's for ${name}`;
//   }, [name]);

//   useEffect(() => {
//     applyPriceFilter();
//   }, [priceFilter, shoe]);

//   const handlePriceFilterChange = (e) => {
//     setPriceFilter(e.target.value);
//     setOpen(false);
//   };

//   const applyPriceFilter = () => {
//     let filtered = shoe;
//     if (priceFilter) {
//       const [min, max] = priceFilter.split("-").map(Number);
//       filtered = shoe.filter((sh) => {
//         const discountedPrice = sh.price - (sh.price * sh.discount) / 100;
//         return discountedPrice >= min && (max ? discountedPrice <= max : true);
//       });
//     }
//     setFilteredShoes(filtered);
//   };

//   return (
//     <>
//       <Navbar />
//       <ResponsiveNavbar />
//       <div className="hidden w-full lg:block absolute top-[70px]">
//         <div className="w-full h-full  gap-3 flex ">
//           <div className="w-[20%] h-[90vh] bg-black p-7 ">
//             <h1 className="text-white text-2xl">Filter</h1>
//             <hr className="mt-3" />

//             <div className="mt-3">
//               <h1 className="text-white">Filter By price</h1>
//               <div className="flex gap-3 text-white p-2 items-center">
//                 <input
//                   type="radio"
//                   name="price"
//                   value=""
//                   id="reset"
//                   onChange={handlePriceFilterChange}
//                 />
//                 <label htmlFor="reset">Reset</label>
//               </div>
//               <div className="flex gap-3 text-white p-2 items-center">
//                 <input
//                   type="radio"
//                   name="price"
//                   value="200-1000"
//                   id="200"
//                   onChange={handlePriceFilterChange}
//                 />
//                 <label htmlFor="200">200rs - 1000rs</label>
//               </div>
//               <div className="flex gap-3 text-white p-2 items-center">
//                 <input
//                   type="radio"
//                   name="price"
//                   value="1001-2000"
//                   onChange={handlePriceFilterChange}
//                   id="1001"
//                 />
//                 <label htmlFor="1001">1001rs - 2000rs</label>
//               </div>
//               <div className="flex gap-3 text-white p-2 items-center">
//                 <input
//                   type="radio"
//                   name="price"
//                   value="2001-3000"
//                   onChange={handlePriceFilterChange}
//                   id="2001"
//                 />
//                 <label htmlFor="2001">2001rs - 3000rs</label>
//               </div>
//               <div className="flex gap-3 text-white p-2 items-center">
//                 <input
//                   type="radio"
//                   name="price"
//                   value="3001-4000"
//                   onChange={handlePriceFilterChange}
//                   id="3001"
//                 />
//                 <label htmlFor="3001">3001rs - 4000rs</label>
//               </div>
//               <div className="flex gap-3 text-white p-2 items-center">
//                 <input
//                   type="radio"
//                   name="price"
//                   value="4001-5000"
//                   onChange={handlePriceFilterChange}
//                   id="4001"
//                 />
//                 <label htmlFor="4001">4001rs - 5000rs</label>
//               </div>
//               <div className="flex gap-3 text-white p-2 items-center">
//                 <input
//                   type="radio"
//                   name="price"
//                   value="5000-"
//                   id="5000"
//                   onChange={handlePriceFilterChange}
//                 />
//                 <label htmlFor="5000">More than 5000rs</label>
//               </div>
//             </div>
//           </div>

//           {filteredShoes.length === 0 ? (
//             <ShowMsg msg={"No product found!"} wid={"80%"} hig={"90vh"} />
//           ) : (
//             <div className=" w-[80%] h-[90vh] p-7 grid grid-cols-3 overflow-scroll no-scrollbar">
//               {filteredShoes.map((sh) => (
//                 <Card key={sh.id} shoe={sh} showNav={true} />
//               ))}
//             </div>
//           )}
//         </div>

//         <Footer />
//       </div>

//       {/* responsive */}

//       <div className="w-full h-auto  gap-3 flex flex-col lg:hidden absolute top-[100px] ">
//         <div className="w-[20%] h-auto bg-black p-7 hidden ">
//           <h1 className="text-white text-2xl">Filter</h1>
//           <hr className="mt-3" />

//           <div className="mt-3">
//             <h1 className="text-white">Filter By price</h1>
//             <div className="flex gap-3 text-white p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="200-1000"
//                 id="200"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="200">200rs - 1000rs</label>
//             </div>
//             <div className="flex gap-3 text-white p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="1001-2000"
//                 onChange={handlePriceFilterChange}
//                 id="1001"
//               />
//               <label htmlFor="1001">1001rs - 2000rs</label>
//             </div>
//             <div className="flex gap-3 text-white p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="2001-3000"
//                 onChange={handlePriceFilterChange}
//                 id="2001"
//               />
//               <label htmlFor="2001">2001rs - 3000rs</label>
//             </div>
//             <div className="flex gap-3 text-white p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="3001-4000"
//                 onChange={handlePriceFilterChange}
//                 id="3001"
//               />
//               <label htmlFor="3001">3001rs - 4000rs</label>
//             </div>
//             <div className="flex gap-3 text-white p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="4001-5000"
//                 onChange={handlePriceFilterChange}
//                 id="4001"
//               />
//               <label htmlFor="4001">4001rs - 5000rs</label>
//             </div>
//             <div className="flex gap-3 text-white p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="5000-"
//                 id="5000"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="5000">More than 5000rs</label>
//             </div>
//           </div>
//         </div>

//         <div
//           className=" px-4 py-1 rounded-full border w-fit mx-5 relative"
//           onClick={() => setOpen(!open)}
//         >
//           <h2>{priceFilter === "" ? "Filter By Price" : priceFilter}</h2>
//         </div>
//         {open && (
//           <div className=" absolute top-10 left-8 z-10 px-3 bg-white shadow-2xl border rounded-md">
//             <div className="flex gap-3 text-black p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value=""
//                 id="reset"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="reset">Reset</label>
//             </div>
//             <div className="flex gap-3 text-black p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="200-1000"
//                 id="200"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="200">200rs - 1000rs</label>
//             </div>
//             <div className="flex gap-3 text-black p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="1001-2000"
//                 onChange={handlePriceFilterChange}
//                 id="1001"
//               />
//               <label htmlFor="1001">1001rs - 2000rs</label>
//             </div>
//             <div className="flex gap-3 text-black p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="2001-3000"
//                 onChange={handlePriceFilterChange}
//                 id="2001"
//               />
//               <label htmlFor="2001">2001rs - 3000rs</label>
//             </div>
//             <div className="flex gap-3 text-black p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="3001-4000"
//                 onChange={handlePriceFilterChange}
//                 id="3001"
//               />
//               <label htmlFor="3001">3001rs - 4000rs</label>
//             </div>
//             <div className="flex gap-3 text-black p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="4001-5000"
//                 onChange={handlePriceFilterChange}
//                 id="4001"
//               />
//               <label htmlFor="4001">4001rs - 5000rs</label>
//             </div>
//             <div className="flex gap-3 text-black p-2 items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 value="5000-"
//                 id="5000"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="5000">More than 5000rs</label>
//             </div>
//           </div>
//         )}

//         {filteredShoes.length === 0 ? (
//           <ShowMsg msg={"No product found!"} wid={"80%"} hig={"90vh"} />
//         ) : (
//           <div className=" w-full h-auto p-2 grid grid-cols-1 sm:grid-cols-2">
//             {filteredShoes.map((sh) => (
//               <Card key={sh.id} shoe={sh} showNav={true} />
//             ))}
//           </div>
//         )}

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default GoToCategory;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Components/Card";
import ShowMsg from "../Components/ShowMsg";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ResponsiveNavbar from "../Components/ResponsiveNavbar";

const GoToCategory = () => {
  const [shoe, setShoe] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { name } = useParams();

  const fetchShoes = async (page) => {
    try {
      let res;
      if (name === "New") {
        res = await axios.get(
          `http://localhost:5050/api/v1/shoe/recent?page=${page}&limit=6`
        );
      } else if (name === "Kids") {
        res = await axios.get(
          `http://localhost:5050/api/v1/shoe/search?type=kid&page=${page}&limit=3`
        );
      } else {
        res = await axios.get(
          `http://localhost:5050/api/v1/shoe/search?type=${name}&page=${page}&limit=3`
        );
      }
      const data = res?.data?.recentProducts || res?.data?.shoes;

      console.log("fuck data", data);

      setShoe((prevShoes) => [...prevShoes, ...data]);
      setFilteredShoes((prevShoes) => [...prevShoes, ...data]);
      setHasMore(data.length > 0);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("first", shoe);

  useEffect(() => {
    setShoe([]);
    setFilteredShoes([]);
    setPage(1);
    setHasMore(true);
    fetchShoes(1);
  }, [name]);

  useEffect(() => {
    document.title = `Puma Shoe's for ${name}`;
  }, [name]);

  useEffect(() => {
    applyPriceFilter();
  }, [priceFilter, shoe]);

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
    setOpen(false);
  };

  const applyPriceFilter = () => {
    let filtered = shoe;
    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = shoe.filter((sh) => {
        const discountedPrice = sh.price - (sh.price * sh.discount) / 100;
        return discountedPrice >= min && (max ? discountedPrice <= max : true);
      });
    }
    setFilteredShoes(filtered);
  };

  return (
    <>
      <Navbar />
      <ResponsiveNavbar />
      <div className="hidden w-full lg:block absolute top-[70px]">
        <div className="w-full h-full  gap-3 flex ">
          <div className="w-[20%] h-[90vh] bg-white p-7 ">
            <h1 className="text-black text-2xl">Filter</h1>
            <hr className="mt-3" />

            <div className="mt-3">
              <h1 className="text-black">Filter By price</h1>
              <div className="flex gap-3 text-black p-2 items-center">
                <input
                  type="radio"
                  name="price"
                  value=""
                  id="reset"
                  onChange={handlePriceFilterChange}
                />
                <label htmlFor="reset">Reset</label>
              </div>
              <div className="flex gap-3 text-black p-2 items-center">
                <input
                  type="radio"
                  name="price"
                  value="200-1000"
                  id="200"
                  onChange={handlePriceFilterChange}
                />
                <label htmlFor="200">200rs - 1000rs</label>
              </div>
              <div className="flex gap-3 text-black p-2 items-center">
                <input
                  type="radio"
                  name="price"
                  value="1001-2000"
                  onChange={handlePriceFilterChange}
                  id="1001"
                />
                <label htmlFor="1001">1001rs - 2000rs</label>
              </div>
              <div className="flex gap-3 text-black p-2 items-center">
                <input
                  type="radio"
                  name="price"
                  value="2001-3000"
                  onChange={handlePriceFilterChange}
                  id="2001"
                />
                <label htmlFor="2001">2001rs - 3000rs</label>
              </div>
              <div className="flex gap-3 text-black p-2 items-center">
                <input
                  type="radio"
                  name="price"
                  value="3001-4000"
                  onChange={handlePriceFilterChange}
                  id="3001"
                />
                <label htmlFor="3001">3001rs - 4000rs</label>
              </div>
              <div className="flex gap-3 text-black p-2 items-center">
                <input
                  type="radio"
                  name="price"
                  value="4001-5000"
                  onChange={handlePriceFilterChange}
                  id="4001"
                />
                <label htmlFor="4001">4001rs - 5000rs</label>
              </div>
              <div className="flex gap-3 text-black p-2 items-center">
                <input
                  type="radio"
                  name="price"
                  value="5000-"
                  id="5000"
                  onChange={handlePriceFilterChange}
                />
                <label htmlFor="5000">More than 5000rs</label>
              </div>
            </div>
          </div>

          {filteredShoes?.length === 0 ? (
            <ShowMsg msg={"No product found!"} wid={"80%"} hig={"90vh"} />
          ) : (
            <div className=" w-[80%] h-auto p-7 ">
              <InfiniteScroll
                dataLength={filteredShoes.length}
                next={() => {
                  setPage((prevPage) => prevPage + 1);
                  fetchShoes(page + 1);
                }}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                className=" w-full grid grid-cols-3"
              >
                {filteredShoes?.map((sh) => (
                  <Card key={sh.id} shoe={sh} showNav={true} />
                ))}
              </InfiniteScroll>
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* responsive */}

      <div className="w-full h-auto  gap-3 flex flex-col lg:hidden absolute top-[100px] ">
        <div className="w-[20%] h-auto bg-black p-7 hidden ">
          <h1 className="text-white text-2xl">Filter</h1>
          <hr className="mt-3" />

          <div className="mt-3">
            <h1 className="text-white">Filter By price</h1>
            <div className="flex gap-3 text-white p-2 items-center">
              <input
                type="radio"
                name="price"
                value="200-1000"
                id="200"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="200">200rs - 1000rs</label>
            </div>
            <div className="flex gap-3 text-white p-2 items-center">
              <input
                type="radio"
                name="price"
                value="1001-2000"
                onChange={handlePriceFilterChange}
                id="1001"
              />
              <label htmlFor="1001">1001rs - 2000rs</label>
            </div>
            <div className="flex gap-3 text-white p-2 items-center">
              <input
                type="radio"
                name="price"
                value="2001-3000"
                onChange={handlePriceFilterChange}
                id="2001"
              />
              <label htmlFor="2001">2001rs - 3000rs</label>
            </div>
            <div className="flex gap-3 text-white p-2 items-center">
              <input
                type="radio"
                name="price"
                value="3001-4000"
                onChange={handlePriceFilterChange}
                id="3001"
              />
              <label htmlFor="3001">3001rs - 4000rs</label>
            </div>
            <div className="flex gap-3 text-white p-2 items-center">
              <input
                type="radio"
                name="price"
                value="4001-5000"
                onChange={handlePriceFilterChange}
                id="4001"
              />
              <label htmlFor="4001">4001rs - 5000rs</label>
            </div>
            <div className="flex gap-3 text-white p-2 items-center">
              <input
                type="radio"
                name="price"
                value="5000-"
                id="5000"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="5000">More than 5000rs</label>
            </div>
          </div>
        </div>

        <div
          className=" px-4 py-1 rounded-full border w-fit mx-5 relative"
          onClick={() => setOpen(!open)}
        >
          <h2>{priceFilter === "" ? "Filter By Price" : priceFilter}</h2>
        </div>
        {open && (
          <div className=" absolute top-10 left-8 z-10 px-3 bg-white shadow-2xl border rounded-md">
            <div className="flex gap-3 text-black p-2 items-center">
              <input
                type="radio"
                name="price"
                value=""
                id="reset"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="reset">Reset</label>
            </div>
            <div className="flex gap-3 text-black p-2 items-center">
              <input
                type="radio"
                name="price"
                value="200-1000"
                id="200"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="200">200rs - 1000rs</label>
            </div>
            <div className="flex gap-3 text-black p-2 items-center">
              <input
                type="radio"
                name="price"
                value="1001-2000"
                onChange={handlePriceFilterChange}
                id="1001"
              />
              <label htmlFor="1001">1001rs - 2000rs</label>
            </div>
            <div className="flex gap-3 text-black p-2 items-center">
              <input
                type="radio"
                name="price"
                value="2001-3000"
                onChange={handlePriceFilterChange}
                id="2001"
              />
              <label htmlFor="2001">2001rs - 3000rs</label>
            </div>
            <div className="flex gap-3 text-black p-2 items-center">
              <input
                type="radio"
                name="price"
                value="3001-4000"
                onChange={handlePriceFilterChange}
                id="3001"
              />
              <label htmlFor="3001">3001rs - 4000rs</label>
            </div>
            <div className="flex gap-3 text-black p-2 items-center">
              <input
                type="radio"
                name="price"
                value="4001-5000"
                onChange={handlePriceFilterChange}
                id="4001"
              />
              <label htmlFor="4001">4001rs - 5000rs</label>
            </div>
            <div className="flex gap-3 text-black p-2 items-center">
              <input
                type="radio"
                name="price"
                value="5000-"
                id="5000"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="5000">More than 5000rs</label>
            </div>
          </div>
        )}

        {filteredShoes.length === 0 ? (
          <ShowMsg msg={"No product found!"} wid={"80%"} hig={"90vh"} />
        ) : (
          <div className=" w-full h-auto p-2 ">
            <InfiniteScroll
              dataLength={filteredShoes.length}
              next={() => {
                setPage((prevPage) => prevPage + 1);
                fetchShoes(page + 1);
              }}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              className="grid grid-cols-1 sm:grid-cols-2 w-full"
            >
              {filteredShoes.map((sh) => (
                <Card key={sh.id} shoe={sh} showNav={true} />
              ))}
            </InfiniteScroll>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default GoToCategory;
