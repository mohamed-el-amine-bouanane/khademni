"use client";
import { useContext, useEffect, useState } from "react";
import { ALGERIA, BACKEND_URL } from "@/app/constants/index.js";
import OfferCard from "@/app/components/Offer/OfferCard";
import ReactPaginate from "react-paginate";
import api from "@/app/utils/api";
import { AuthContext } from "@/app/context/Auth";
import { Oval } from "react-loader-spinner";
import { handleLogin } from "@/app/utils/actions";

const Offers = () => {
  const [address, setAddress] = useState([{ wilaya: "", commune: "" }]);
  const [totalPages, setTotalePages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isFiltred, setIsFiltred] = useState(false);
  const [cashOffers, setCacheOffers] = useState([]);
  const [nbrPage, setNbrPages] = useState(0);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setIsLoading(true);
        const result = await api.get("/api/tasks/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext?.authState?.token}`,
          },
        });

        const categoriesResult = await api.get("/api/categories/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext?.authState?.token}`,
          },
        });

        if (result.statusText === "OK") {
          const data = result.data;
          const categories = categoriesResult.data.data;
          setTotalePages(data.totalPages);
          setOffers(data.data);
          if (categoriesResult.statusText === "OK") {
            setCategories(categories);
            setIsLoading(false);
          } else {
            setErr(result.data.error);
          }
        }
      } catch (error) {
        if (error.response?.data?.error) {
          setErr(error.response.data.error);
        } else {
          setErr(error.message);
        }
        setIsLoading(false);
      }
    };

    if (authContext?.authState?.token) {
      setErr(null);
      fetchPage();
    }
  }, [authContext]);

  const fetchNextPage = async (url) => {
    setErr(null);
    setIsLoading(true);
    try {
      const result = await api.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext?.authState?.token}`,
        },
      });
      const data = result.data.data;
      setOffers(data);
      setIsLoading(false);
    } catch (error) {
      if (error.response?.data?.error) {
        setErr(error.response.data.error);
      } else {
        setErr(error.message);
      }
      setIsLoading(false);
    }
  };

  const handlePageChange = (selectedPage) => {
    setIsLoading(true);
    setCurrentPage(selectedPage.selected);
    const page = selectedPage.selected + 1;
    let url = "";

    if (!isFiltred) {
      url = "/api/tasks/?page=" + page;
    } else {
      const wilaya = address[0].wilaya;
      const commune = address[0].commune;
      const filterParams = {
        maxPrice: maxPrice,
        categoryId: categoryId,
        wilaya: wilaya,
        commune: commune,
        page: page,
      };

      const nonNullParams = Object.fromEntries(
        Object.entries(filterParams).filter(
          ([key, value]) => value != null && value != ""
        )
      );

      const queryString = new URLSearchParams(nonNullParams).toString();
      url = `/api/tasks/filter?${queryString}`;
    }
    fetchNextPage(url);
    setIsLoading(false);
  };

  const handleFilter = async () => {
    const wilaya = address[0].wilaya;
    const commune = address[0].commune;

    const filterParams = {
      maxPrice: maxPrice,
      categoryId: categoryId,
      wilaya: wilaya,
      commune: commune,
    };

    const nonNullParams = Object.fromEntries(
      Object.entries(filterParams).filter(
        ([key, value]) => value != null && value != ""
      )
    );
    if (Object.keys(nonNullParams).length === 0) {
      alert("Fill at least one elemnt to filter");
    } else {
      setCurrentPage(0);
      setCacheOffers(offers);
      setNbrPages(totalPages);
      setIsFiltred(true);
      const queryString = new URLSearchParams(nonNullParams).toString();
      try {
        const result = await api.get(`/api/tasks/filter?${queryString}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext?.authState?.token}`,
          },
        });
        const filtredOffers = result.data.data;
        const nbrPages = result.data.totalPages;
        setOffers(filtredOffers);
        setTotalePages(nbrPages);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ClearFilter = () => {
    setCurrentPage(0);
    setAddress([{ wilaya: "", commune: "" }]);
    setCategoryId("");
    setMaxPrice("");
    setIsFiltred(false);
    setOffers(cashOffers);
    setTotalePages(nbrPage);
  };

  const handleAddressChange = (index, field, value) => {
    const newAddress = [...address];
    newAddress[index][field] = value;
    setAddress(newAddress);
  };

  return (
    <div className="mt-5 px-20">
      <h1 className="text-[56px] font-bold text-[#27419E] ">The Offers</h1>
      <h3 className="text-[22px] font-semibold">
        Here you can see different offers available
      </h3>
      {categories.length > 0 ? (
        <div>
          <div className="flex justify-start items-center w-full mt-10 gap-20">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              defaultValue=""
              className="border-[3px] border-[#CBCBCB] p-3 w-[200px] text-[#b2b1b1] rounded-full focus:text-black hover:cursor-pointer focus:border-black"
            >
              <option value="">Categories</option>
              {categories.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>

            {/*  */}

            {address.map((addr, index) => (
              <div
                key={index}
                className="flex justify-start items-center  gap-20"
              >
                <select
                  name="wilaya"
                  value={addr.wilaya}
                  onChange={(e) =>
                    handleAddressChange(index, "wilaya", e.target.value)
                  }
                  className="border-[3px] border-[#CBCBCB] p-3 w-[200px] text-[#b2b1b1] rounded-full focus:text-black hover:cursor-pointer focus:border-black"
                >
                  <option value={""}>Choisir La Wilaya</option>
                  {Object.keys(ALGERIA)?.map((wilaya) => (
                    <option
                      key={wilaya}
                      value={wilaya}
                      className="cursor-pointer"
                    >
                      {wilaya}
                    </option>
                  ))}
                </select>
                <select
                  name="commune"
                  value={addr.commune}
                  onChange={(e) =>
                    handleAddressChange(index, "commune", e.target.value)
                  }
                  className="border-[3px] border-[#CBCBCB] p-3 w-[200px] text-[#b2b1b1] rounded-full focus:text-black hover:cursor-pointer focus:border-black"
                >
                  <option value={""}>Choisir La Commune</option>
                  {ALGERIA &&
                    ALGERIA[addr.wilaya]?.communes.map((commune) => (
                      <option
                        key={commune}
                        value={commune}
                        className="cursor-pointer"
                      >
                        {commune}
                      </option>
                    ))}
                </select>
              </div>
            ))}

            <input
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter Maximum price"
              className="border-[3px] border-[#CBCBCB] p-3 w-[200px] text-[#b2b1b1] rounded-full focus:text-black  focus:border-black"
            />

            {!isFiltred ? (
              <button
                onClick={handleFilter}
                className="p-2 bg-[#27419E] rounded-xl text-white text-lg px-6 hover:bg-blue-900"
              >
                Filter
              </button>
            ) : (
              <button
                onClick={ClearFilter}
                className="p-2 bg-[#27419E] rounded-xl text-white text-lg px-6 hover:bg-blue-900"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex gap-8 justify-start flex-wrap mt-16 mb-10">
            {!isLoading && offers.length > 0 ? (
              offers.map((elem) => {
                return <OfferCard key={elem.id} offer={elem} />;
              })
            ) : (
              <h3 className=" text-center absolute left-[40%] top-1/2 text-[28px] ">
                No Element Founded
              </h3>
            )}
          </div>
        </div>
      ) : (
        !err && (
          <div className="absolute top-1/2 left-1/2">
            <Oval
              height={100}
              width={100}
              color="#27419E"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#274160"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )
      )}
      {err && (
        <h3 className="text-red-600 top-1/2 w-full text-center absolute text-[36px] font-bold">
          {" "}
          {err}
        </h3>
      )}
      <ReactPaginate
        className={`flex justify-center items-center md:gap-6 gap-4 my-6 ${
          isLoading ? "hidden" : "flex"
        }`}
        breakLabel="..."
        nextLabel={<h3 className="font-bold">{"Next >>"}</h3>}
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={<h3 className="font-bold">{"<< previous"}</h3>}
        renderOnZeroPageCount={null}
        forcePage={currentPage}
        activeClassName={"bg-[#183BB7] text-white p-1 px-3 rounded-sm "}
        disabledClassName={"opacity-50"}
      />
    </div>
  );
};

export default Offers;
