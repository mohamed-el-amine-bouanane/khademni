"use client"
import { AuthContext } from '@/app/context/Auth';
import api from '@/app/utils/api';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useDropzone } from 'react-dropzone';

const EditOffer = () => {
  const [images, setImages] = useState([]);
  const [isLoading , setIsLoading] = useState(true)
  const [Err ,setErr] = useState(null)
  const [textErr , setError] = useState(null)
  const [categories,setCategories] = useState([])
  const [offer,setOffer] = useState({})
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const {id} = useParams()
  const [formData, setFormData] = useState({
    category: '',
    price: '',
    description: '',
  });

  const onDrop = useCallback((acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setImages((prevImages) => [...prevImages, ...filesWithPreview]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  const handleDeleteImage = (file) => {
    setImages((prevImages) => prevImages.filter((img) => img !== file));
    URL.revokeObjectURL(file.preview); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(null)

    if(formData.category=='' || formData.description=='' || formData.price == '')
    {
      setError("Please Fill all the fields")
    }
    else if(images.length ==0)
    {
      setError("Upload at least one Image")

    }
    else{
      try{
        const form = new FormData();
        form.append('categoryId', formData.category);
        form.append('price', formData.price);
        form.append('description', formData.description);
        images.forEach((image) => {
          form.append('taskimages', image);
        });
        const result = await api.put('/api/tasks/'+id, form, 
        {headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authContext.authState?.token}`,
        }
        })
        if(result.statusText==="OK")
        {
          router.push('/offers/'+id); // Replace with your actual success page path
        }
      }
      catch (error) {
        if (error.response?.data?.error) {
            setError(error.response.data.error);
        } else {
            setError(error.message);
        }
      }
    }
    
  };


  useEffect(()=>{
    const fetchData=async ()=>{
      setErr(null)
      setIsLoading(true)
      try{
        const categoriesResult = await api.get('/api/categories/',
        {headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.authState?.token}`,
        }
        })
        const categories = categoriesResult.data.data
        setCategories(categories)
        const result = await api.get('/api/tasks/'+id,
        {headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.authState?.token}`,
        }
        })
        const offerData = result.data.data
        setFormData((prevData) => ({ ...prevData, ["price"]: offerData.task.price }));
        setFormData((prevData) => ({ ...prevData, ["description"]: offerData.task.description }));
        setFormData((prevData) => ({ ...prevData, ["category"]: offerData.task.categoryId }));

        setOffer(offerData)
        setIsLoading(false)
      }
      catch (error) {
        if (error.response?.data?.error) {
            setErr(error.response.data.error);
        } else {
            setErr(error.message);
        }
        setIsLoading(false)
      }
      
    }

    if(authContext.authState?.token)
    {
          fetchData()
    }   
  },[authContext])

  return (
  <div>
   {(!isLoading && !Err) ? <div className="px-20 flex justify-center items-center flex-col">
      <h3 className="text-[#27419E] text-[40px] font-bold mt-6">Edit Offer</h3>
      <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col gap-8 mt-10">
        <div className="flex justify-center items-center gap-8">
          <select
            name="category"
            defaultValue=""
            value={formData.category}
            onChange={handleInputChange}
            className="border-[3px] border-[#CBCBCB] p-3 w-[300px] text-[#b2b1b1] rounded-full focus:text-black hover:cursor-pointer focus:border-black"
          >
            <option value="" >
              Categories
            </option>
            {categories.map(elem=>{
                  return <option key={elem.id} value={elem.id} selected={elem.id === offer.task.category.id ? true : false}>{elem.name}</option>
                })}
          </select>
          <input
            type="number"
            name="price"
            value={formData.price}
            min="0"
            step="0.01"
            onChange={handleInputChange}
            placeholder="Enter The price By hour"
            className="border-[3px] border-[#CBCBCB] p-3 w-[300px] text-[#b2b1b1] rounded-full focus:text-black focus:border-black"
          />
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={7}
          placeholder="Enter your description"
          className="border-[3px] border-[#CBCBCB] p-3 w-[620px] text-[#b2b1b1] rounded-lg focus:text-black hover:cursor-pointer focus:border-black"
        />
        <div
          {...getRootProps()}
          className={`mt-4 p-6 w-[620px] border-[3px] border-[#CBCBCB] text-[#b2b1b1] rounded-lg focus:border-black hover:cursor-pointer ${
            isDragActive ? 'border-black' : ''
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files to replace the current images </p>
          )}
        </div>
        <div className="mt-4 w-[620px] flex flex-wrap gap-4">
          {images.map((file) => (
            <div key={file.name} className="w-[120px] h-[120px] relative border border-[#CBCBCB] p-1 rounded-lg">
              <img
                src={file.preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
                onLoad={() => URL.revokeObjectURL(file.preview)}
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(file)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        {textErr && <h3 className='text-red-600 font-bold text-[18px]'>{textErr}</h3> }
        <button className="p-2 bg-[#27419E] rounded-xl text-white text-lg w-[300px] mb-4 hover:bg-blue-900">
                Submit
        </button>

      </form>
    </div> :  (!Err)&& <h3 className="absolute top-1/2 w-full text-center">Loading ... </h3>}
    {(!isLoading && Err ) && <h3 className="absolute text-red-600 top-1/2 left-[40%] font-bold text-[36px]">{Err}</h3> }
  </div> 
  );
};

export default EditOffer;
